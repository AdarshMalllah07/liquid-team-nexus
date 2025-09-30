import { useState } from "react";
import { Save, FileText, Trash2, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category: string;
}

const initialNotes: Note[] = [
  {
    id: "1",
    title: "Meeting Notes - Q1 Planning",
    content: "Discussed roadmap for Q1 2024. Key priorities:\n- Launch new feature by end of January\n- Improve performance metrics\n- User research for next iteration",
    createdAt: "2 hours ago",
    category: "Meeting",
  },
  {
    id: "2",
    title: "Project Ideas",
    content: "- Implement dark mode\n- Add collaboration features\n- Integrate with third-party tools\n- Mobile app development",
    createdAt: "Yesterday",
    category: "Ideas",
  },
  {
    id: "3",
    title: "Code Review Checklist",
    content: "✓ Code follows style guidelines\n✓ Tests are included\n✓ Documentation updated\n✓ No console logs\n✓ Performance considerations",
    createdAt: "3 days ago",
    category: "Technical",
  },
];

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
  const [editedContent, setEditedContent] = useState(notes[0]?.content || "");
  const [editedTitle, setEditedTitle] = useState(notes[0]?.title || "");
  const [showAISuggestion, setShowAISuggestion] = useState(false);

  const handleSave = () => {
    if (selectedNote) {
      setNotes(notes.map((note) =>
        note.id === selectedNote.id
          ? { ...note, title: editedTitle, content: editedContent }
          : note
      ));
    }
  };

  const handleDelete = () => {
    if (selectedNote) {
      const filteredNotes = notes.filter((note) => note.id !== selectedNote.id);
      setNotes(filteredNotes);
      setSelectedNote(filteredNotes[0] || null);
      setEditedContent(filteredNotes[0]?.content || "");
      setEditedTitle(filteredNotes[0]?.title || "");
    }
  };

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      createdAt: "Just now",
      category: "General",
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setEditedTitle(newNote.title);
    setEditedContent(newNote.content);
  };

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setShowAISuggestion(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Meeting":
        return "bg-blue-400/20 text-blue-400";
      case "Ideas":
        return "bg-purple-400/20 text-purple-400";
      case "Technical":
        return "bg-green-400/20 text-green-400";
      default:
        return "bg-gray-400/20 text-gray-400";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)] animate-fade-in">
      {/* Notes List */}
      <div className="glass-panel p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-glass-foreground">Notes</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNewNote}
            className="glass-button"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => handleNoteSelect(note)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedNote?.id === note.id
                  ? "bg-gradient-accent text-white"
                  : "hover:bg-glass-hover"
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <FileText className="h-4 w-4 mt-0.5" />
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedNote?.id === note.id ? "bg-white/20" : getCategoryColor(note.category)
                }`}>
                  {note.category}
                </span>
              </div>
              <h4 className="font-medium text-sm mb-1 line-clamp-1">{note.title}</h4>
              <p className="text-xs opacity-70 line-clamp-2">{note.content}</p>
              <p className="text-xs opacity-50 mt-2">{note.createdAt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="lg:col-span-3 glass-panel p-6 flex flex-col">
        {selectedNote ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-xl font-bold bg-transparent border-none outline-none text-glass-foreground flex-1"
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAISuggestion(!showAISuggestion)}
                  className="glass-button"
                >
                  <Sparkles className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSave}
                  className="glass-button"
                >
                  <Save className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                  className="glass-button text-destructive"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {showAISuggestion && (
              <div className="glass-card mb-4 p-3 border-l-4 border-accent animate-slide-in">
                <div className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-glass-foreground mb-1">
                      AI Summary Suggestion
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Based on your note content, here's a suggested summary: "Team meeting covered Q1 priorities including feature launch, performance improvements, and user research initiatives."
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Start typing your note..."
              className="flex-1 glass-input resize-none text-sm"
            />

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {editedContent.length} characters • Last saved {selectedNote.createdAt}
              </p>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(selectedNote.category)}`}>
                  {selectedNote.category}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select a note to start editing</p>
              <Button onClick={handleNewNote} className="glass-button mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create New Note
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}