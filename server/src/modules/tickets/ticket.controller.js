import validator from "validator";

import Ticket from "../../modules/tickets/ticket.model.js";
import Note from "../../modules/note/note.model.js";
import generateTicketId from "../../utils/generateTicketId.js";


const ALLOWED_STATUSES = [
  "Open",
  "In Progress",
  "Closed"
];

const ALLOWED_PRIORITIES = [
  "Low",
  "Medium",
  "High",
  "Urgent"
];

export const createTicket = async (
  req,
  res,
  next
) => {
  try {
    const {
      customer_name,
      customer_email,
      subject,
      description,
      priority = "Medium"
    } = req.body;

    if (
      !customer_name ||
      !customer_email ||
      !subject ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message:
          "customer_name, customer_email, subject and description are required"
      });
    }

    const cleanName =
      customer_name.trim();

    const cleanEmail =
      customer_email
        .trim()
        .toLowerCase();

    const cleanSubject =
      subject.trim();

    const cleanDescription =
      description.trim();

    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message:
          "Customer name must contain at least 2 characters"
      });
    }

    if (!validator.isEmail(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a valid email address"
      });
    }

    if (cleanSubject.length < 3) {
      return res.status(400).json({
        success: false,
        message:
          "Subject must contain at least 3 characters"
      });
    }

    if (cleanDescription.length < 5) {
      return res.status(400).json({
        success: false,
        message:
          "Description must contain at least 5 characters"
      });
    }


    if (
      !ALLOWED_PRIORITIES.includes(priority)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid priority. Allowed values: Low, Medium, High, Urgent"
      });
    }

    const ticket_id =
      await generateTicketId();

    const ticket =
      await Ticket.create({
        ticket_id,

        customer_name:
          cleanName,

        customer_email:
          cleanEmail,

        subject:
          cleanSubject,

        description:
          cleanDescription,

        priority
      });


    return res.status(201).json({
      success: true,

      ticket_id:
        ticket.ticket_id,

      created_at:
        ticket.createdAt
    });

  } catch (error) {
    next(error);
  }
};

export const getTickets = async (
  req,
  res,
  next
) => {
  try {

    const {
      status,
      priority,
      search,
      page = 1,
      limit = 20
    } = req.query;

    const filter = {};
    if (status) {

      if (
        !ALLOWED_STATUSES.includes(status)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid status. Allowed values: Open, In Progress, Closed"
        });
      }

      filter.status = status;
    }

    if (priority) {
      if (
        !ALLOWED_PRIORITIES.includes(
          priority
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid priority. Allowed values: Low, Medium, High, Urgent"
        });
      }

      filter.priority = priority;
    }

    if (
      search &&
      search.trim()
    ) {

      const searchValue =
        search.trim();


      filter.$or = [

        {
          ticket_id: {
            $regex: searchValue,
            $options: "i"
          }
        },

        {
          customer_name: {
            $regex: searchValue,
            $options: "i"
          }
        },

        {
          customer_email: {
            $regex: searchValue,
            $options: "i"
          }
        },

        {
          subject: {
            $regex: searchValue,
            $options: "i"
          }
        },

        {
          description: {
            $regex: searchValue,
            $options: "i"
          }
        }

      ];
    }

    const pageNumber =
      Math.max(
        Number(page) || 1,
        1
      );


    const limitNumber =
      Math.min(
        Math.max(
          Number(limit) || 20,
          1
        ),
        100
      );


    const skip =
      (pageNumber - 1) *
      limitNumber;

    const [
      tickets,
      total
    ] = await Promise.all([

      Ticket.find(filter)

        .sort({
          createdAt: -1
        })

        .skip(skip)

        .limit(limitNumber)

        .select(
          "ticket_id customer_name customer_email subject status priority createdAt updatedAt"
        )

        .lean(),


      Ticket.countDocuments(filter)

    ]);

    return res.status(200).json({
      success: true,
      page:
        pageNumber,
      limit:
        limitNumber,
      total,

      totalPages:
        Math.ceil(
          total / limitNumber
        ),
      tickets

    });

  } catch (error) {
    next(error);
  }
};

// GET SINGLE TICKET
export const getTicketById = async (
  req,
  res,
  next
) => {

  try {

    const {
      ticket_id
    } = req.params;


    const ticket =
      await Ticket.findOne({
        ticket_id
      }).lean();


    if (!ticket) {

      return res.status(404).json({
        success: false,
        message:
          "Ticket not found"
      });

    }

    const notes =
      await Note.find({
        ticket_id
      })

        .sort({
          createdAt: -1
        })

        .lean();

    return res.status(200).json({

      success: true,

      ticket: {

        ticket_id:
          ticket.ticket_id,

        customer_name:
          ticket.customer_name,

        customer_email:
          ticket.customer_email,

        subject:
          ticket.subject,

        description:
          ticket.description,

        status:
          ticket.status,

        priority:
          ticket.priority || "Medium",

        created_at:
          ticket.createdAt,

        updated_at:
          ticket.updatedAt,

        notes

      }

    });

  } catch (error) {
    next(error);
  }
};

export const updateTicket = async (
  req,
  res,
  next
) => {

  try {

    const {
      ticket_id
    } = req.params;


    const {
      status,
      notes,
      priority
    } = req.body;

    if (
      status === undefined &&
      priority === undefined &&
      notes === undefined
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Provide status, priority or notes to update"

      });

    }

    const ticket =
      await Ticket.findOne({
        ticket_id
      });


    if (!ticket) {

      return res.status(404).json({

        success: false,

        message:
          "Ticket not found"

      });

    }

    if (
      status !== undefined
    ) {

      if (
        !ALLOWED_STATUSES.includes(
          status
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid status. Allowed values: Open, In Progress, Closed"

        });

      }


      ticket.status =
        status;

    }

    if (
      priority !== undefined
    ) {

      if (
        !ALLOWED_PRIORITIES.includes(
          priority
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid priority. Allowed values: Low, Medium, High, Urgent"

        });

      }


      ticket.priority =
        priority;

    }

    if (
      status !== undefined ||
      priority !== undefined
    ) {

      await ticket.save();

    }

    if (
      typeof notes === "string" &&
      notes.trim()
    ) {

      await Note.create({

        ticket_id,

        note_text:
          notes.trim()

      });

    }

    return res.status(200).json({

      success: true,

      updated_at:
        ticket.updatedAt

    });

  } catch (error) {

    next(error);

  }

};