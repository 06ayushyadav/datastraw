import { Link } from "react-router-dom";
import { Eye, ExternalLink } from "lucide-react";

const priorityStyles = {
    Low: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",

    Medium:
        "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",

    High:
        "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200",

    Urgent:
        "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
};

const statusStyles = {
    Open: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",

    "In Progress":
        "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",

    Closed:
        "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",
};

const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

function TicketTable({ tickets }) {
    if (!tickets.length) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <p className="text-sm font-medium text-slate-600">
                    No tickets found
                </p>

                <p className="mt-1 text-sm text-slate-400">
                    Try changing your search or filter.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Responsive table */}
            <div className="overflow-x-auto">

                <table className="w-full min-w-[800px] text-left">

                    {/* Header */}
                    <thead className="border-b border-slate-200 bg-slate-50">
                        <tr>

                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Ticket
                            </th>

                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Customer
                            </th>

                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Subject
                            </th>


                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Priority
                            </th>


                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Status
                            </th>

                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Created
                            </th>

                            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Action
                            </th>

                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-slate-100">

                        {tickets.map((ticket) => (

                            <tr
                                key={ticket.ticket_id}
                                className="group transition-colors hover:bg-slate-50"
                            >

                                {/* Ticket ID */}
                                <td className="px-5 py-4">

                                    <Link
                                        to={`/tickets/${ticket.ticket_id}`}
                                        className="inline-flex items-center gap-1.5 font-semibold text-slate-900 hover:text-blue-600"
                                    >
                                        {ticket.ticket_id}

                                        <ExternalLink
                                            size={13}
                                            className="opacity-0 transition-opacity group-hover:opacity-100"
                                        />
                                    </Link>

                                </td>


                                {/* Customer */}
                                <td className="max-w-[220px] px-5 py-4">

                                    <p className="truncate font-medium text-slate-800">
                                        {ticket.customer_name}
                                    </p>

                                    <p
                                        className="truncate text-xs text-slate-400"
                                        title={ticket.customer_email}
                                    >
                                        {ticket.customer_email}
                                    </p>

                                </td>


                                {/* Subject */}
                                <td className="max-w-[280px] px-5 py-4">

                                    <p
                                        className="truncate font-medium text-slate-700"
                                        title={ticket.subject}
                                    >
                                        {ticket.subject}
                                    </p>

                                </td>

                                <td className="px-5 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[ticket.priority || "Medium"]
                                            }`}
                                    >
                                        {ticket.priority || "Medium"}
                                    </span>
                                </td>


                                {/* Status */}
                                <td className="px-5 py-4">

                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[ticket.status] ||
                                            "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200"
                                            }`}
                                    >
                                        {ticket.status}
                                    </span>

                                </td>


                                {/* Date */}
                                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                                    {formatDate(
                                        ticket.createdAt || ticket.created_at
                                    )}
                                </td>


                                {/* Action */}
                                <td className="px-5 py-4 text-right">

                                    <Link
                                        to={`/tickets/${ticket.ticket_id}`}
                                        aria-label={`View ${ticket.ticket_id}`}
                                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                                    >
                                        <Eye size={16} />
                                        View
                                    </Link>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default TicketTable;

