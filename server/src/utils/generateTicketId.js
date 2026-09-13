import Counter from "../modules/tickets/counter.model.js";

const generateTicketId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { _id: "ticket" },
    {
      $inc: {
        seq: 1
      }
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }
  );

  return `TKT-${String(counter.seq).padStart(3, "0")}`;
};

export default generateTicketId;