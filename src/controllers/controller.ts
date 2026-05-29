import type { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";
import type {
  MessageRequest,
  MessageResponseAuth,
  MessageResponsePublic,
} from "../models/message.dto.js";
import { validateNewMessage } from "../middlewares/validates/validateMessage.js";
import {
  getAllMessagesAuth,
  getAllMessagesPublic,
  insertMessageWithMemberId,
} from "../db/queries.js";

export const homeGet: RequestHandler = (req, res) => {
  void (async () => {
    let messages: MessageResponseAuth[] | MessageResponsePublic[];
    if (!req.isAuthenticated()) {
      messages = await getAllMessagesPublic();
    } else {
      messages = await getAllMessagesAuth();
    }
    res.render("index", {
      messages: messages,
      isAdmin: req.user!.isAdmin
    });
  })();
};

export const dashboardGet: RequestHandler = (req, res) => {
  res.render("index", {
    status: req.user!.status,
  });
};

export const messageGet: RequestHandler = (req, res) => {
  res.render("index");
};

const messagePostHandler: RequestHandler = (req, res) => {
  void (async () => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        errors: errors.array(),
        prev: req.body as Record<string, unknown>,
      });
    }
    const { title, content }: MessageRequest = matchedData(req);
    await insertMessageWithMemberId({ title, content }, req.user!.memberId);
    res.redirect("/");
  })();
};

export const messagePost = [...validateNewMessage, messagePostHandler];
