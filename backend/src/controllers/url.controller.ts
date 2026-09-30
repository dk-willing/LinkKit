import express from "express";
import { URL } from "../models/url.model";

export const getAllUrls = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const urls = await URL.find();
    if (!urls) {
      return res.status(404).json({
        message: "No url found",
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: {
          urls,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error,
    });
  }
};
export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortPath = String(req.params.id);
    const url = await URL.findOne({ shortPath });

    if (!url) {
      return res.status(404).json({
        status: "fail",
        message: "No url found",
      });
    } else {
      url.clicks++;
      url.save();
      return res.redirect(`${url.fullPath}`);
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error,
    });
  }
};
export const createUrl = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { fullPath } = req.body;
    const foundUrl = await URL.find({ fullPath });

    if (foundUrl) {
      return res.status(409).json({
        status: "fail",
        message: "Url already exist",
      });
    } else {
      const url = await URL.create();
      return res.status(201).json({
        status: "success",
        data: {
          url,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error,
    });
  }
};
export const deleteUrl = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const url = await URL.findByIdAndDelete(req.params.id);

    if (url) {
      return res.status(204).json({
        message: "Resource deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error,
    });
  }
};
