import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Settings, Search } from "lucide-react";
import {
  mockAIPersonas,
  mockKnowledgeBase,
  mockAutoActions,
  mockRoutingRules,
} from "@/lib/mockData";
import { PersonaCard } from "@/components/ai-engine/PersonaCard";
import { CreatePersonaDrawer } from "@/components/ai-engine/CreatePersonaDrawer";
import { KnowledgeBaseTable } from "@/components/ai-engine/KnowledgeBaseTable";
import { AutoActionsCard } from "@/components/ai-engine/AutoActionsCard";
import { RoutingRulesTable } from "@/components/ai-engine/RoutingRulesTable";

export default function AIEngine() {
  const [personas, setPersonas] = useState(mockAIPersonas);
  const [knowledgeBase, setKnowledgeBase] = useState(mockKnowledgeBase);
  const [autoActions, setAutoActions] = useState(mockAutoActions);
  const [routingRules, setRoutingRules] = useState(mockRoutingRules);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("personas");

  const filteredPersonas = personas.filter(
    (persona) =>
      persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePersona = () => {
    setSelectedPersona(null);
    setIsCreateDrawerOpen(true);
  };

  const handleEditPersona = (persona: any) => {
    setSelectedPersona(persona);
    setIsCreateDrawerOpen(true);
  };

  const handleDeletePersona = (id: string) => {
    setPersonas(personas.filter((p) => p.id !== id));
  };

  const handleSavePersona = (personaData: any) => {
    if (selectedPersona) {
      // Update existing
      setPersonas(
        personas.map((p) =>
          p.id === selectedPersona.id
            ? { ...p, ...personaData, updatedAt: new Date().toISOString().split("T")[0] }
            : p
        )
      );
    } else {
      // Create new
      const newPersona = {
        ...personaData,
        id: `ai_${String(personas.length + 1).padStart(2, "0")}`,
        conversationsHandled: 0,
        avgResponseTime: "0s",
        successRate: "0%",
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setPersonas([...personas, newPersona]);
    }
    setIsCreateDrawerOpen(false);
  };

  const handleTogglePersonaStatus = (id: string) => {
    setPersonas(
      personas.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? ("Paused" as const) : ("Active" as const) }
          : p
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Engine</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create and manage AI assistants for automation and intelligent conversations
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button onClick={handleCreatePersona} className="gap-2">
              <Plus className="h-4 w-4" />
              Create AI Persona
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personas">AI Personas</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="actions">Auto-Actions</TabsTrigger>
            <TabsTrigger value="routing">Routing Rules</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <Tabs value={activeTab} className="w-full">
            {/* AI Personas Tab */}
            <TabsContent value="personas" className="mt-0">
              <div className="mb-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search AI personas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {filteredPersonas.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    No AI personas yet
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create your first AI persona to automate your business conversations
                  </p>
                  <Button onClick={handleCreatePersona} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create AI Persona
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPersonas.map((persona) => (
                    <PersonaCard
                      key={persona.id}
                      persona={persona}
                      onEdit={handleEditPersona}
                      onDelete={handleDeletePersona}
                      onToggleStatus={handleTogglePersonaStatus}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Knowledge Base Tab */}
            <TabsContent value="knowledge" className="mt-0">
              <KnowledgeBaseTable
                knowledgeBase={knowledgeBase}
                onUpdate={setKnowledgeBase}
              />
            </TabsContent>

            {/* Auto-Actions Tab */}
            <TabsContent value="actions" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {autoActions.map((action) => (
                  <AutoActionsCard
                    key={action.id}
                    action={action}
                    onUpdate={(updatedAction) => {
                      setAutoActions(
                        autoActions.map((a) =>
                          a.id === updatedAction.id ? updatedAction : a
                        )
                      );
                    }}
                    onDelete={(id) => {
                      setAutoActions(autoActions.filter((a) => a.id !== id));
                    }}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Routing Rules Tab */}
            <TabsContent value="routing" className="mt-0">
              <RoutingRulesTable
                routingRules={routingRules}
                onUpdate={setRoutingRules}
              />
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      {/* Create/Edit Drawer */}
      <CreatePersonaDrawer
        open={isCreateDrawerOpen}
        onOpenChange={setIsCreateDrawerOpen}
        persona={selectedPersona}
        onSave={handleSavePersona}
      />
    </div>
  );
}
