"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Plus,
    Trash2,
    Timer,
    Shield,
    Lock,
    Globe,
    Sparkles,
    CheckCircle2,
    Save,
    LayoutDashboard,
    Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
}

export default function QuizHostPage() {
    const router = useRouter();

    // Quiz State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timer, setTimer] = useState(30);
    const [isPrivate, setIsPrivate] = useState(false);
    const [roomCode] = useState(Math.random().toString(36).substring(2, 8).toUpperCase());

    // Questions State
    const [questions, setQuestions] = useState<Question[]>([
        { id: "1", text: "", options: ["", "", "", ""], correctAnswer: 0 }
    ]);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { id: Date.now().toString(), text: "", options: ["", "", "", ""], correctAnswer: 0 }
        ]);
    };

    const removeQuestion = (id: string) => {
        if (questions.length > 1) {
            setQuestions(questions.filter(q => q.id !== id));
        }
    };

    const updateQuestion = (id: string, field: keyof Question, value: any) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const updateOption = (qId: string, optIdx: number, value: string) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                const newOpts = [...q.options];
                newOpts[optIdx] = value;
                return { ...q, options: newOpts };
            }
            return q;
        }));
    };

    const handleExportCSV = () => {
        const headers = ["Question", "Option A", "Option B", "Option C", "Option D", "Correct Answer Index"];
        const rows = questions.map(q => [
            q.text,
            ...q.options,
            q.correctAnswer
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(cell => `"${cell.toString().replace(/"/g, '""')}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `${title || "quiz"}_export.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCreate = () => {
        // Logic to save to Supabase would go here
        console.log({ title, description, timer, isPrivate, roomCode, questions });
        router.push("/quiz/success");
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-indigo-500/30">
            {/* Dynamic Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.back()}
                            className="hover:bg-zinc-800 text-zinc-400"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                                Create New Quiz
                            </h1>
                            <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">Host Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={handleExportCSV}
                            className="hidden md:flex border-zinc-800 hover:bg-zinc-900 gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Export CSV
                        </Button>
                        <Button variant="outline" className="hidden md:flex border-zinc-800 hover:bg-zinc-900">
                            Save Draft
                        </Button>
                        <Button
                            onClick={handleCreate}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 shadow-lg shadow-indigo-500/20"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Launch Quiz
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="grid gap-8">

                    {/* Section 1: Quiz Details */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-indigo-400" />
                            </div>
                            <h2 className="text-xl font-semibold">Quiz Details</h2>
                        </div>

                        <div className="grid gap-6 rounded-3xl border border-zinc-800/50 bg-zinc-900/30 p-8 backdrop-blur-sm">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-zinc-400">Quiz Title</label>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Modern Web Development Mastery"
                                    className="h-14 bg-zinc-900/50 border-zinc-800 text-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-zinc-400">Description (Optional)</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Briefly describe what this quiz is about..."
                                    className="min-h-[100px] w-full rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 text-white placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800/50">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Timer className="h-4 w-4 text-violet-400" />
                                            <label className="text-sm font-medium text-zinc-300">Question Timer</label>
                                        </div>
                                        <span className="text-lg font-bold text-violet-400">{timer}s</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="5"
                                        max="120"
                                        step="5"
                                        value={timer}
                                        onChange={(e) => setTimer(parseInt(e.target.value))}
                                        className="w-full accent-violet-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                                        <span>5s</span>
                                        <span>120s</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {isPrivate ? <Lock className="h-4 w-4 text-amber-400" /> : <Globe className="h-4 w-4 text-emerald-400" />}
                                            <label className="text-sm font-medium text-zinc-300">Visibility</label>
                                        </div>
                                        <div
                                            onClick={() => setIsPrivate(!isPrivate)}
                                            className={`relative w-14 h-7 rounded-full transition-colors duration-300 cursor-pointer ${isPrivate ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                        >
                                            <div className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-lg transition-transform duration-300 ${isPrivate ? 'translate-x-7' : 'translate-x-0'}`} />
                                        </div>
                                    </div>

                                    {isPrivate ? (
                                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="flex items-center gap-3">
                                                <Lock className="h-4 w-4 shrink-0" />
                                                <div>
                                                    <p className="font-bold">Private Mode</p>
                                                    <p className="text-xs opacity-80 font-mono">Code: <span className="text-white underline">{roomCode}</span></p>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`http://localhost:3000/quiz?room=${roomCode}`);
                                                }}
                                                className="h-8 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 px-3 text-xs"
                                            >
                                                Copy Link
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <Globe className="h-4 w-4 shrink-0" />
                                            <div>
                                                <p className="font-bold">Public Mode</p>
                                                <p className="text-xs opacity-80">Anyone can find and join from lobby</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Questions */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                                    <LayoutDashboard className="h-4 w-4 text-violet-400" />
                                </div>
                                <h2 className="text-xl font-semibold">Questions ({questions.length})</h2>
                            </div>
                            <Button
                                onClick={addQuestion}
                                variant="outline"
                                className="border-dashed border-zinc-700 hover:border-violet-500 hover:text-violet-400"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Question
                            </Button>
                        </div>

                        <div className="space-y-8">
                            {questions.map((q, idx) => (
                                <div
                                    key={q.id}
                                    className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 backdrop-blur-sm transition-all hover:border-zinc-700/50"
                                >
                                    <div className="absolute -left-3 top-8 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 font-bold text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        {idx + 1}
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <Input
                                                    placeholder="What is the question?"
                                                    value={q.text}
                                                    onChange={(e) => updateQuestion(q.id, "text", e.target.value)}
                                                    className="border-none bg-zinc-900/50 p-6 text-xl font-medium focus:ring-0 placeholder:text-zinc-700 rounded-2xl h-auto"
                                                />
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeQuestion(q.id)}
                                                className="text-zinc-600 hover:text-red-400 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {q.options.map((opt, optIdx) => (
                                                <div
                                                    key={optIdx}
                                                    className={`flex items-center gap-3 rounded-2xl border transition-all p-3 ${q.correctAnswer === optIdx
                                                        ? 'border-emerald-500/50 bg-emerald-500/5'
                                                        : 'border-zinc-800 bg-zinc-900/30'
                                                        }`}
                                                >
                                                    <div
                                                        onClick={() => updateQuestion(q.id, "correctAnswer", optIdx)}
                                                        className={`h-6 w-6 rounded-full flex items-center justify-center cursor-pointer transition-colors ${q.correctAnswer === optIdx
                                                            ? 'bg-emerald-500 text-white'
                                                            : 'border-2 border-zinc-700 hover:border-zinc-500'
                                                            }`}
                                                    >
                                                        {q.correctAnswer === optIdx && <CheckCircle2 className="h-4 w-4" />}
                                                    </div>
                                                    <Input
                                                        value={opt}
                                                        onChange={(e) => updateOption(q.id, optIdx, e.target.value)}
                                                        placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                                                        className="border-none bg-transparent h-10 px-0 focus:ring-0"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={addQuestion}
                            className="w-full h-20 border-2 border-dashed border-zinc-800 bg-transparent text-zinc-500 hover:border-indigo-500/50 hover:text-indigo-400 hover:bg-indigo-500/5 rounded-3xl transition-all"
                        >
                            <Plus className="mr-2 h-6 w-6" />
                            Add Another Question
                        </Button>
                    </section>
                </div>
            </main>

            <footer className="mt-20 border-t border-zinc-900 bg-zinc-950 px-4 py-12">
                <div className="container mx-auto text-center opacity-40 hover:opacity-100 transition-opacity">
                    <p className="text-zinc-400 text-sm">Need help? Read our <span className="underline cursor-pointer">Host Guide</span></p>
                </div>
            </footer>
        </div>
    );
}
