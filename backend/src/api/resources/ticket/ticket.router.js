import express from "express"
import ticketController from "./ticket.controller";


export const ticketRouter = express.Router();

ticketRouter.post("/", ticketController.addTicket)
ticketRouter.put("/", ticketController.updateTicket)
ticketRouter.get("/s/t", ticketController.getListSuggestTicket)
ticketRouter.get("/", ticketController.getListTicket)
ticketRouter.get("/c", ticketController.getListTicketCategory)
ticketRouter.get("/d", ticketController.getTicketDetail)
ticketRouter.delete("/", ticketController.deleteTicket)