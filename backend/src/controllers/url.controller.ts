import express from "express";
import { URLModel } from "../models/url.model";

export const getAllUrls = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const urls = await URLModel.find();
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
    const url = await URLModel.findOne({ shortPath });

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


    if(!fullPath || typeof fullPath !== 'string') {
      return res.status(400).json({
        status: 'fail',
        message: "fullPath is required"
      })
    }

    try {
      new URL(fullPath)
    } catch(err) {
      return res.status(400).json({
        status: 'Bad request',
        message: 'fullPath must be a valid URL'
      })
    }

    const foundUrl = await URLModel.findOne({ fullPath });

    if (foundUrl) {
      return res.status(409).json({
        status: "fail",
        message: "Url already exist",
      });
    } else {
      const url = await URLModel.create({fullPath});
      return res.status(201).json({
        status: "success",
        data: {
          url,
        },
      });
    }
  } catch (error) {
    // Duplicate key from the unique index (race condition)
    const mongoError = error as { code?: number };

    if (mongoError.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Url already exists",
      });
    }

    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
}

export const deleteUrl = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const url = await URLModel.findByIdAndDelete(req.params.id);

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
