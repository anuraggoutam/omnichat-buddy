import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { StickyNote } from "lucide-react";

interface Note {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  mentions: string[];
}

interface InternalNotesProps {
  notes: Note[];
}

export const InternalNotes = ({ notes }: InternalNotesProps) => {
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    // In real app, this would save the note
    setNewNote("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Notes List */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <StickyNote className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No internal notes yet</p>
          </div>
        ) : (
          notes.map((note) => (
            <Card key={note.id} className="p-3">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                  {note.authorAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{note.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(note.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap">{note.content}</p>
            </Card>
          ))
        )}
      </div>

      {/* Add Note */}
      <div className="border-t border-border p-4">
        <Textarea
          placeholder="Add an internal note... (Use @name to mention)"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="mb-2 min-h-[80px]"
        />
        <Button onClick={handleAddNote} size="sm" className="w-full">
          <StickyNote className="h-4 w-4 mr-2" />
          Add Note
        </Button>
      </div>
    </div>
  );
};
