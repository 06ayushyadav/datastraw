import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import toast from "react-hot-toast";
import { createTicket } from "../services/ticketService";

const initialForm = {
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
    priority: "Medium",
};

const CreateTicket = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.customer_name.trim() ||
            !form.customer_email.trim() ||
            !form.subject.trim() ||
            !form.description.trim()
        ) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const response = await createTicket({
                customer_name: form.customer_name.trim(),
                customer_email: form.customer_email.trim(),
                subject: form.subject.trim(),
                description: form.description.trim(),
                priority:form.priority
            });

            toast.success("Ticket created successfully");

            navigate(`/tickets/${response.ticket_id}`);
        } catch (error) {
            console.error("Create ticket error:", error);

            const message =
                error.response?.data?.message ||
                "Failed to create ticket";

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8">
            <div className="mx-auto max-w-3xl">

                {/* Back */}
                <button
                    onClick={() => navigate("/")}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
                >
                    <ArrowLeft size={18} />
                    Back to Tickets
                </button>

                {/* Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Create New Ticket
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Create a customer support ticket with the required details.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Customer Name */}
                        <div>
                            <label
                                htmlFor="customer_name"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Customer Name
                            </label>

                            <input
                                id="customer_name"
                                name="customer_name"
                                type="text"
                                value={form.customer_name}
                                onChange={handleChange}
                                placeholder="Enter customer name"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Customer Email */}
                        <div>
                            <label
                                htmlFor="customer_email"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Customer Email
                            </label>

                            <input
                                id="customer_email"
                                name="customer_email"
                                type="email"
                                value={form.customer_email}
                                onChange={handleChange}
                                placeholder="customer@example.com"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Subject */}
                        <div>
                            <label
                                htmlFor="subject"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Issue Title / Subject
                            </label>

                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                value={form.subject}
                                onChange={handleChange}
                                placeholder="Example: Unable to login"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Description
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                rows={7}
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Describe the customer's issue..."
                                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            <p className="mt-2 text-xs text-slate-400">
                                Minimum 5 characters
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="priority"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Priority
                            </label>

                            <select
                                id="priority"
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Send size={17} />

                                {loading ? "Creating..." : "Create Ticket"}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTicket;