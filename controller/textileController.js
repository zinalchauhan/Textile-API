var express = require("express");
var app = express();
var router = express.Router();
var multer = require("multer");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
const states = require("indian-cities-json");
var mongoose = require("mongoose");
// ================= TextileModel =======================
const userModel = require("../model/userModel");
const companyModel = require("../model/companyModel");
const stateModel = require("../model/stateModel");
const cityModel = require("../model/cityModel");
const defectModel = require("../model/defectModel");
const designModel = require("../model/designModel");
const factoryModel = require("../model/factoryModel");
const machineModel = require("../model/machineModel");
const orderItemsModel = require("../model/orderItemsModel");
const orderModel = require("../model/orderModel");
const particularModel = require("../model/particularModel");
const partyModel = require("../model/partyModel");
const takaModel = require("../model/takaModel");
const yarmModel = require("../model/yarmPurchaseModel");
const factoryOutModel = require("../model/factoryOutModel");
const orderDispatchModel = require("../model/orderDispatchModel");
const designPhotoModel = require("../model/designPhotoModel");
const batchModel = require("../model/batchModel");
const stockModel = require("../model/stockModel");
const yarmPurchaseModel = require("../model/yarmPurchaseModel");
const { json } = require("body-parser");
//=== Array Variable

var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./public/upload/");
  },

  filename: function (req, file, cb) {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
});

//============== User Login ===============
router.post("/login", async (req, res) => {
  const objs = await userModel.findOne({
    userName: req.body.userName,
    userPassword: req.body.userPassword,
  });

  console.log(objs);

  if (objs != null) {
    res.json({ result: "success", msg: "login Successfully", data: objs });
  } else {
    res.json({ result: "fail", msg: "login UnSuccessfuly", data: objs });
  }
});

//========= count API ==============
router.get("/getCount", async (req, res) => {
  var objdata = {};
  objdata.pendingOrderCount = await orderModel
    .find({ orderStatus: "Pending", isActive: true })
    .count();
  objdata.InMachineCount = await batchModel
    .find({ status: "In Machine", isActive: true })
    .count();
  objdata.ReadyFoldingCount = await batchModel
    .find({ status: "Ready For Folding", isActive: true })
    .count();
  objdata.InFoldingCount = await batchModel
    .find({ status: "In Folding", isActive: true })
    .count();
  objdata.FoldingDoneCount = await takaModel
    .find({ takaStatus: "Folding Done", isActive: true })
    .count();
  objdata.InButtaCuttingCount = await takaModel
    .find({ takaStatus: "In Butta Cutting", isActive: true })
    .count();
  objdata.ButtaCuttingDoneCount = await takaModel
    .find({ takaStatus: "Butta Cutting Done", isActive: true })
    .count();
  objdata.InMillCount = await takaModel
    .find({ takaStatus: "In Mill", isActive: true })
    .count();
  objdata.MillDoneCount = await takaModel
    .find({ takaStatus: "Mill Process Done", isActive: true })
    .count();
  objdata.InBorderCount = await takaModel
    .find({ takaStatus: "In Border Cutting", isActive: true })
    .count();
  objdata.BorderCuttingCount = await takaModel
    .find({ takaStatus: "Border Cutting Done", isActive: true })
    .count();
  objdata.InCuttingCount = await takaModel
    .find({ takaStatus: "In Cutting", isActive: true })
    .count();
  objdata.ReadySaleCount = await stockModel.find().count();

  res.json({
    result: "success",
    msg: "User Add Successfully",
    data: objdata,
  });
});

//================ User API =======================

router.post("/addUser", async (req, res) => {
  var user = new userModel();
  user.userName = req.body.userName;
  user.userPassword = req.body.userPassword;
  user.userType = req.body.userType;
  user.createdBy = req.body.createdBy;
  user.createdDateTime = new Date();
  user.addOn = new Date();
  user.isActive = "true";

  const objdata = await user.save();

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "User Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.post("/updateUser", async (req, res) => {
  const objdata = await userModel.updateOne(
    { _id: req.body.id },
    {
      userName: req.body.userName,
      //userPassword: req.body.userPassword,
      userType: req.body.userType,
      modifiedDateTime: new Date(),
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "User Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/changePassword", async (req, res) => {
  const objdata = await userModel.updateOne(
    { _id: req.body.id },
    {
      userPassword: req.body.userPassword,
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "User Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/deleteUser", async (req, res) => {
  const objdata = await userModel.updateOne(
    { _id: req.body.id },
    {
      isActive: false,
    }
  );
  if (objdata != null) {
    res.json({
      result: "success",
      msg: "User Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/getByUserID", async (req, res) => {
  const objdata = await userModel.findOne({ _id: req.body.id });
  if (objdata != null) {
    res.json({ result: "success", msg: "User List Found", data: objdata });
  } else {
    res.json({ result: "failure", msg: "User List Not Found", data: objdata });
  }
});

router.get("/getAllUser", async (req, res) => {
  const objdata = await userModel.find({ isActive: true });
  if (objdata != null) {
    res.json({ result: "success", msg: "User List Found", data: objdata });
  } else {
    res.json({ result: "failure", msg: "User List Not Found", data: objdata });
  }
});

//================ DesignPhoto API =======================

router.post(
  "/addDesignPhoto",
  upload.array("pathImage", 10),
  async (req, res) => {
    var objdata;
    for (const file of req.files) {
      var designP = new designPhotoModel();
      designP.pathImage = file.filename;
      designP.createdBy = req.body.createdBy;
      designP.createdDateTime = new Date();
      designP.addOn = new Date();
      designP.isActive = "true";
      //==FK
      designP.designIDFK = req.body.designIDFK;

      objdata = await designP.save();
    }

    if (objdata != null) {
      res.json({
        result: "success",
        msg: "User Add Successfully",
        data: 1,
      });
    } else {
      res.json({
        result: "fail",
        msg: "Not Inserted",
        data: 0,
      });
    }
  }
);

router.post(
  "/updateDesignPhoto",
  upload.single("pathImage"),
  async (req, res) => {
    const objdata = await designPhotoModel.updateOne(
      { _id: req.body.id },
      {
        pathImage: req.file.filename,
        createdBy: req.body.createdByfilename,
        createdDateTime: new Date(),
        addOn: new Date(),
        isActive: req.body.isActivefilename,
        //:FK
        designIDFK: req.body.designIDFKfilename,
      }
    );

    if (objdata != null) {
      res.json({
        result: "success",
        msg: "User Updated Successfully",
        data: true,
      });
    } else {
      res.json({ result: "failure", msg: "Unsuccessful", data: false });
    }
  }
);

router.post("/deleteDesignPhoto", async (req, res) => {
  const objdata = await designPhotoModel.updateOne(
    { _id: req.body.id },
    {
      isActive: false,
    }
  );
  if (objdata != null) {
    res.json({
      result: "success",
      msg: "User Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/getByDesignPhotoID", async (req, res) => {
  const objdata = await designPhotoModel
    .findOne({ _id: req.body.id })
    .populate("designIDFK", ["design"]);
  if (objdata != null) {
    res.json({ result: "success", msg: "User List Found", data: objdata });
  } else {
    res.json({ result: "failure", msg: "User List Not Found", data: objdata });
  }
});

router.post("/findDesignPhoto", async (req, res) => {
  const objdata = await designPhotoModel.find({
    isActive: true,
    designIDFK: req.body.designIDFK,
  });

  var objDesign = new Array();
  for (const design of objdata) {
    var element = JSON.parse(JSON.stringify(design));

    if (design.pathImage != null) {
      element.pathImage = "upload/" + design.pathImage;
    } else {
      element.pathImage = "upload/noImage.png";
    }

    objDesign.push(element);
  }

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "DesignPhoto List Found",
      data: objDesign,
    });
  } else {
    res.json({
      result: "failure",
      msg: "DesignPhoto List Not Found",
      data: objDesign,
    });
  }
});

router.get("/getDesignPhoto", async (req, res) => {
  const objdata = await designPhotoModel.find();
  res.send(objdata);
});

//=========== Company API =============

router.post("/addCompany", async (req, res) => {
  var company = new companyModel();
  company.companyName = req.body.companyName;
  company.companyPrefix = req.body.companyPrefix;
  company.companyAddress = req.body.companyAddress;
  company.companyCreatedBy = req.body.companyCreatedBy;
  company.craetedDateTime = new Date();
  company.addOn = new Date();
  company.isActive = "true";

  const objdata = await company.save();

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Company Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.post("/updateCompany", async (req, res) => {
  const objdata = await companyModel.updateOne(
    { _id: req.body.id },
    {
      companyName: req.body.companyName,
      companyAddress: req.body.companyAddress,
      companyPrefix: req.body.companyPrefix,
      modifiedDateTime: new Date(),
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Company Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: " Unsuccessful", data: false });
  }
});

router.post("/deleteCompany", async (req, res) => {
  const objdata = await companyModel.updateOne(
    { _id: req.body.id },
    {
      isActive: false,
    }
  );
  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Company Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: " Unsuccessful", data: false });
  }
});

router.post("/getByCompanyID", async (req, res) => {
  const objdata = await companyModel.findOne({ _id: req.body.id });
  if (objdata != null) {
    res.json({ result: "success", msg: "Company List Found", data: objdata });
  } else {
    res.json({
      result: "failure",
      msg: "Company List Not Found",
      data: objdata,
    });
  }
});

router.get("/getAllCompany", async (req, res) => {
  const objdata = await companyModel.find({ isActive: true });
  if (objdata != null) {
    res.json({ result: "success", msg: "User List Found", data: objdata });
  } else {
    res.json({ result: "failure", msg: "User List Not Found", data: objdata });
  }
});

//=========== Batch API =============

router.post("/addBatch", async (req, res) => {
  var batch = new batchModel();
  batch.status = req.body.status;
  batch.createdBy = req.body.createdBy;
  batch.createdDateTime = new Date();
  batch.addOn = new Date();
  batch.isActive = "true";
  //==FK
  batch.designIDFK = req.body.designIDFK;
  batch.machineIDFK = req.body.machineIDFK;

  const objdata = await batch.save();

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Company Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.post("/addDesignMachine", async (req, res) => {
  var batch = new batchModel();

  console.log(req.body.designIDFK);
  console.log(req.body.machineIDFK);
  batch.designIDFK = req.body.designIDFK;
  batch.machineIDFK = req.body.machineIDFK;
  batch.status = "In Machine";
  batch.createdBy = req.body.createdBy;
  batch.createdDateTime = new Date();
  batch.addOn = new Date();
  batch.isActive = "true";
  var pageValue = req.body.page;

  if (pageValue == "FoldingOut") {
    const design = await designModel.findOne({
      designNo: req.body.designIDFK,
      isActive: true,
    });
    //console.log(design);
    batch.designIDFK = design._id;
  }

  const objdata = await batch.save();

  const pipeline1 = [
    [
      {
        $lookup: {
          from: "machines",
          localField: "machineIDFK",
          foreignField: "_id",
          as: "machine",
        },
      },
      {
        $addFields: {
          machine: {
            $arrayElemAt: ["$machine", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designs",
          localField: "designIDFK",
          foreignField: "_id",
          as: "design",
        },
      },
      {
        $addFields: {
          design: {
            $arrayElemAt: ["$design", 0],
          },
        },
      },
      {
        $lookup: {
          from: "factories",
          localField: "machine.factoryIDFK",
          foreignField: "_id",
          as: "factory",
        },
      },
      {
        $addFields: {
          factory: {
            $arrayElemAt: ["$factory", 0],
          },
        },
      },
    ],
  ];
  var data = new Array();
  const aggCursor1 = batchModel.aggregate(pipeline1);
  for await (const doc of aggCursor1) {
    // console.log(doc._id);
    // console.log("object ID");
    // console.log(objdata._id);
    if (objdata._id.toString() == doc._id.toString()) {
      //console.log(objdata._id);
      data.push(doc);
    }
  }
  console.log("Batch All Data==========");
  console.log(data);
  console.log(data[0].factory.factoryPrefix);
  console.log(data[0].machine.machineType);

  const pipeline = [
    [
      {
        $lookup: {
          from: "batches",
          localField: "batchIDFK",
          foreignField: "_id",
          as: "batch",
        },
      },
      {
        $addFields: {
          batch: {
            $arrayElemAt: ["$batch", 0],
          },
        },
      },
      {
        $lookup: {
          from: "machines",
          localField: "batch.machineIDFK",
          foreignField: "_id",
          as: "machine",
        },
      },
      {
        $addFields: {
          machine: {
            $arrayElemAt: ["$machine", 0],
          },
        },
      },
      {
        $lookup: {
          from: "factories",
          localField: "machine.factoryIDFK",
          foreignField: "_id",
          as: "factory",
        },
      },
      {
        $addFields: {
          factory: {
            $arrayElemAt: ["$factory", 0],
          },
        },
      },
      {
        $match: {
          "machine.machineType": data[0].machine.machineType,
          "factory.factoryPrefix": data[0].factory.factoryPrefix,
        },
      },
    ],
  ];
  var taka = new Array();
  const aggCursor = takaModel.aggregate(pipeline);
  for await (const doc of aggCursor) {
    taka.push(doc);
  }
  console.log("Taka All Data==========");
  console.log(taka);

  var convertedJson = JSON.parse(JSON.stringify(data[0]));
  convertedJson.takaStatus = "In Machine";
  convertedJson.takaNumber = "0";
  convertedJson.taka = taka;

  if (convertedJson != null) {
    res.json({
      result: "success",
      msg: "Design Add Successfully",
      data: convertedJson,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: convertedJson,
    });
  }
});

router.post("/getMachineBySelection", async (req, res) => {
  var machineTypeValue = req.body.machineType;
  var machineNumber = req.body.machineNumber;

  var itemArray = machineTypeValue.split("-");
  console.log(itemArray[0]);
  console.log(itemArray[1]);

  const pipeline1 = [
    [
      {
        $lookup: {
          from: "factories",
          localField: "factoryIDFK",
          foreignField: "_id",
          as: "factoryIDFK",
        },
      },
      {
        $addFields: {
          factoryIDFK: {
            $arrayElemAt: ["$factoryIDFK", 0],
          },
        },
      },
      {
        $match: {
          isActive: true,
          machineType: itemArray[1],
          machineNumber: machineNumber,
          "factoryIDFK.factoryPrefix": itemArray[0],
        },
      },
    ],
  ];
  var objdata = new Array();
  const aggCursor1 = machineModel.aggregate(pipeline1);
  for await (const doc of aggCursor1) {
    objdata.push(doc);
  }

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Machine Data Found Successfully",
      data: objdata[0],
    });
  } else {
    res.json({ result: "failure", msg: " Unsuccessful", data: objdata });
  }
});

router.post("/updateBatch", async (req, res) => {
  const objdata = await batchModel.updateOne(
    { _id: req.body.id },
    {
      status: req.body.status,
      createdBy: req.body.createdBy,
      modifiedDateTime: new Date(),
      //==FK
      designIDFK: req.body.designIDFK,
      machineIDFK: req.body.machineIDFK,
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Company Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: " Unsuccessful", data: false });
  }
});

router.post("/updateStatusBatch", async (req, res) => {
  const objdata = await batchModel.updateOne(
    { _id: req.body.id },
    {
      status: req.body.status,
      modifiedDateTime: new Date(),
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Batch Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: " Unsuccessful", data: false });
  }
});

router.get("/deleteBatch/:id", async (req, res) => {
  const objdata = await batchModel.updateOne(
    { _id: req.params.id },
    {
      isActive: false,
    }
  );
  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Company Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: " Unsuccessful", data: false });
  }
});

router.post("/getBatchData", async (req, res) => {
  var batchID = req.body.id;

  const pipeline = [
    [
      {
        $lookup: {
          from: "batches",
          localField: "batchIDFK",
          foreignField: "_id",
          as: "batch",
        },
      },
      {
        $addFields: {
          batch: {
            $arrayElemAt: ["$batch", 0],
          },
        },
      },
      {
        $lookup: {
          from: "machines",
          localField: "batch.machineIDFK",
          foreignField: "_id",
          as: "machine",
        },
      },
      {
        $addFields: {
          machine: {
            $arrayElemAt: ["$machine", 0],
          },
        },
      },
      {
        $lookup: {
          from: "factories",
          localField: "machine.factoryIDFK",
          foreignField: "_id",
          as: "factoryIDFK",
        },
      },
      {
        $addFields: {
          factoryIDFK: {
            $arrayElemAt: ["$factoryIDFK", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designs",
          localField: "designIDFK",
          foreignField: "_id",
          as: "design",
        },
      },
      {
        $addFields: {
          design: {
            $arrayElemAt: ["$design", 0],
          },
        },
      },
      {
        $match: {
          batchIDFK: mongoose.Types.ObjectId(batchID),
        },
      },
    ],
  ];

  const objdata = await takaModel.aggregate(pipeline);

  var batchData = objdata[0];

  var data = [];

  for (const taka of objdata) {
    var convertedJson = JSON.parse(JSON.stringify(taka));
    console.log(taka);
    if (taka.takaStatus == null) {
      convertedJson.takaStatus == "In Machine";
    }
    if (taka.takaNumber == null) {
      convertedJson.takaNumber = "-";
    }

    const designPhotoData = await designPhotoModel.findOne({
      designIDFK: taka.batch.designIDFK,
    });
    if (designPhotoData != null) {
      convertedJson.pathImage = designPhotoData.pathImage;
    }

    const updatedData = await takaModel.findOne({
      isActive: true,
      batchIDFK: taka.batch._id,
      takaStatus: taka.takaStatus,
    });

    convertedJson.taka = updatedData;
    data.push(convertedJson);
  }

  console.log(data);
  if (data != null) {
    res.json({ result: "success", msg: "User List Found", data: data[0] });
  } else {
    res.json({ result: "failure", msg: "User List Not Found", data: data });
  }
});

router.post("/listBatchByStatus", async (req, res) => {
  var statusValue = req.body.status;
  var sortvalue;
  if (req.body.strSort == "Machine Number High To Low") {
    sortvalue = 1;
  } else {
    sortvalue = -1;
  }
  var pipeline = [];
  if (statusValue == "Ready For Sale") {
    pipeline = [
      [
        {
          $lookup: {
            from: "batches",
            localField: "batchIDFK",
            foreignField: "_id",
            as: "batch",
          },
        },
        {
          $addFields: {
            batch: {
              $arrayElemAt: ["$batch", 0],
            },
          },
        },
        {
          $lookup: {
            from: "machines",
            localField: "batch.machineIDFK",
            foreignField: "_id",
            as: "machine",
          },
        },
        {
          $addFields: {
            machine: {
              $arrayElemAt: ["$machine", 0],
            },
          },
        },
        {
          $lookup: {
            from: "designs",
            localField: "batch.designIDFK",
            foreignField: "_id",
            as: "design",
          },
        },
        {
          $addFields: {
            design: {
              $arrayElemAt: ["$design", 0],
            },
          },
        },
        {
          $lookup: {
            from: "factories",
            localField: "machine.factoryIDFK",
            foreignField: "_id",
            as: "factory",
          },
        },
        {
          $addFields: {
            factory: {
              $arrayElemAt: ["$factory", 0],
            },
          },
        },
        {
          $match: {
            isActive: "true",
            takaStatus: statusValue,
          },
        },
      ],
    ];
  } else {
    pipeline = [
      [
        {
          $lookup: {
            from: "batches",
            localField: "batchIDFK",
            foreignField: "_id",
            as: "batch",
          },
        },
        {
          $addFields: {
            batch: {
              $arrayElemAt: ["$batch", 0],
            },
          },
        },
        {
          $lookup: {
            from: "machines",
            localField: "batch.machineIDFK",
            foreignField: "_id",
            as: "machine",
          },
        },
        {
          $addFields: {
            machine: {
              $arrayElemAt: ["$machine", 0],
            },
          },
        },
        {
          $lookup: {
            from: "designs",
            localField: "batch.designIDFK",
            foreignField: "_id",
            as: "design",
          },
        },
        {
          $addFields: {
            design: {
              $arrayElemAt: ["$design", 0],
            },
          },
        },
        {
          $lookup: {
            from: "factories",
            localField: "machine.factoryIDFK",
            foreignField: "_id",
            as: "factory",
          },
        },
        {
          $addFields: {
            factory: {
              $arrayElemAt: ["$factory", 0],
            },
          },
        },
        {
          $match: {
            isActive: "true",
            "batch.status": statusValue,
          },
        },
        {
          $sort: {
            serialNumber: sortvalue,
          },
        },
      ],
    ];
  }
  const objdata = await takaModel.aggregate(pipeline);
  var batchData = [];
  for (const row of objdata) {
    var convertedJson = JSON.parse(JSON.stringify(row));
    if (row.takaStatus == null) {
      convertedJson.takaStatus == "In Machine";
    }
    if (row.takaNumber == null) {
      convertedJson.takaNumber = "-";
    }

    const designPhotoData = await designPhotoModel.findOne({
      designIDFK: row.design._id,
    });
    if (designPhotoData != null) {
      convertedJson.pathImage = designPhotoData.pathImage;
    }
    var taka = await takaModel.find({
      isActive: true,
      batchIDFK: row.batch._id,
      takaStatus: convertedJson.takaStatus,
      takaQuality: row.takaQuality,
    });
    convertedJson.taka = taka;
    batchData.push(convertedJson);
  }

  if (batchData != null) {
    res.json({ result: "success", msg: "User List Found", data: batchData });
  } else {
    res.json({
      result: "failure",
      msg: "User List Not Found",
      data: batchData,
    });
  }
});

router.post("/selectBatchByDesignMachine", async (req, res) => {
  var designIDValue = req.body.designIDFK;
  var machineIDValue = req.body.machineIDFK;
  console.log(designIDValue);
  console.log(machineIDValue);
  const pipeline1 = [
    [
      {
        $lookup: {
          from: "machines",
          localField: "machineIDFK",
          foreignField: "_id",
          as: "machine",
        },
      },
      {
        $addFields: {
          machine: {
            $arrayElemAt: ["$machine", 0],
          },
        },
      },
      {
        $lookup: {
          from: "factories",
          localField: "machine.factoryIDFK",
          foreignField: "_id",
          as: "factory",
        },
      },
      {
        $addFields: {
          factory: {
            $arrayElemAt: ["$factory", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designs",
          localField: "designIDFK",
          foreignField: "_id",
          as: "design",
        },
      },
      {
        $addFields: {
          design: {
            $arrayElemAt: ["$design", 0],
          },
        },
      },
      {
        $match: {
          "design.designNo": designIDValue,
          "machine._id": mongoose.Types.ObjectId(machineIDValue),
        },
      },
    ],
  ];
  const objdata = await batchModel.aggregate(pipeline1);
  // for await (const doc of aggCursor1) {
  //   if (doc.status != "Folding Done") objdata.push(doc);
  // }
  var batchData = objdata[0];
  // console.log(batchData);
  // console.log("Batch ID");
  // console.log(batchData._id);
  var data = [];
  if (objdata != null) {
    const pipeline = [
      [
        {
          $lookup: {
            from: "batches",
            localField: "batchIDFK",
            foreignField: "_id",
            as: "batch",
          },
        },
        {
          $addFields: {
            batch: {
              $arrayElemAt: ["$batch", 0],
            },
          },
        },
        {
          $lookup: {
            from: "machines",
            localField: "batch.machineIDFK",
            foreignField: "_id",
            as: "machine",
          },
        },
        {
          $addFields: {
            machine: {
              $arrayElemAt: ["$machine", 0],
            },
          },
        },
        {
          $lookup: {
            from: "factories",
            localField: "machine.factoryIDFK",
            foreignField: "_id",
            as: "factory",
          },
        },
        {
          $addFields: {
            factory: {
              $arrayElemAt: ["$factory", 0],
            },
          },
        },
        {
          $lookup: {
            from: "designs",
            localField: "designIDFK",
            foreignField: "_id",
            as: "design",
          },
        },
        {
          $addFields: {
            design: {
              $arrayElemAt: ["$design", 0],
            },
          },
        },
        {
          $match: {
            batchIDFK: batchData._id,
          },
        },
      ],
    ];
    //var objdata = new Array();
    const takaData = await takaModel.aggregate(pipeline);
    console.log("Taka Data=============");
    console.log(takaData);

    for (const taka of takaData) {
      var convertedJson = JSON.parse(JSON.stringify(taka));
      console.log(taka);
      if (taka.takaStatus == null) {
        convertedJson.takaStatus == "In Machine";
      }
      if (taka.takaNumber == null) {
        convertedJson.takaNumber = "-";
      }

      const designPhotoData = await designPhotoModel.findOne({
        designIDFK: taka.batch.designIDFK,
      });
      if (designPhotoData != null) {
        convertedJson.pathImage = designPhotoData.pathImage;
      }

      const pipeline2 = [
        [
          {
            $lookup: {
              from: "batches",
              localField: "batchIDFK",
              foreignField: "_id",
              as: "batch",
            },
          },
          {
            $addFields: {
              batch: {
                $arrayElemAt: ["$batch", 0],
              },
            },
          },
          {
            $lookup: {
              from: "machines",
              localField: "batch.machineIDFK",
              foreignField: "_id",
              as: "machine",
            },
          },
          {
            $addFields: {
              machine: {
                $arrayElemAt: ["$machine", 0],
              },
            },
          },
          {
            $lookup: {
              from: "factories",
              localField: "machine.factoryIDFK",
              foreignField: "_id",
              as: "factory",
            },
          },
          {
            $addFields: {
              factory: {
                $arrayElemAt: ["$factory", 0],
              },
            },
          },
          {
            $match: {
              isActive: "true",
              "factory.factoryPrefix": taka.factory.factoryPrefix,
              "machine.machineType": taka.machine.machineType,
            },
          },
        ],
      ];
      const updatedTaka = await takaModel.aggregate(pipeline2);

      convertedJson.taka = updatedTaka;
      data.push(convertedJson);
    }
    console.log(takaData);
  }
  console.log(data);
  if (data.length > 0) {
    res.json({ result: "success", msg: "User List Found", data: data[0] });
  } else {
    const convertedJson = JSON.parse(JSON.stringify(batchData));
    convertedJson.batchIDFK = batchData._id;
    res.json({
      result: "success",
      msg: "User List Not Found",
      data: convertedJson,
    });
  }
});

// router.post("/selectBatchByMachine", async (req, res) => {
//   const pipeline = [
//     [
//       {
//         $lookup: {
//           from: "designs",
//           localField: "designIDFK",
//           foreignField: "_id",
//           as: "design",
//         },
//       },
//       {
//         $addFields: {
//           design: {
//             $arrayElemAt: ["$design", 0],
//           },
//         },
//       },
//       {
//         $lookup: {
//           from: "machines",
//           localField: "machineIDFK",
//           foreignField: "_id",
//           as: "machine",
//         },
//       },
//       {
//         $addFields: {
//           machine: {
//             $arrayElemAt: ["$machine", 0],
//           },
//         },
//       },
//       {
//         $lookup: {
//           from: "factories",
//           localField: "machine.factoryIDFK",
//           foreignField: "_id",
//           as: "factory",
//         },
//       },
//       {
//         $addFields: {
//           factory: {
//             $arrayElemAt: ["$factory", 0],
//           },
//         },
//       },
//       {
//         $match: {
//           status: "In Machine",
//           isActive: true,
//           "machine._id": mongoose.Types.ObjectId(req.body.machineIDFK),
//         },
//       },
//     ],
//   ];
//   var objdata = new Array();
//   const aggCursor = batchModel.aggregate(pipeline);
//   for await (const doc of aggCursor) {
//     objdata.push(doc);
//   }

//   if (objdata != null) {
//     const pipeline1 = [
//       [
//         {
//           $lookup: {
//             from: "designs",
//             localField: "designIDFK",
//             foreignField: "_id",
//             as: "design",
//           },
//         },
//         {
//           $addFields: {
//             design: {
//               $arrayElemAt: ["$design", 0],
//             },
//           },
//         },
//         {
//           $lookup: {
//             from: "machines",
//             localField: "machineIDFK",
//             foreignField: "_id",
//             as: "machine",
//           },
//         },
//         {
//           $addFields: {
//             machine: {
//               $arrayElemAt: ["$machine", 0],
//             },
//           },
//         },
//         {
//           $lookup: {
//             from: "factories",
//             localField: "machine.factoryIDFK",
//             foreignField: "_id",
//             as: "factory",
//           },
//         },
//         {
//           $addFields: {
//             factory: {
//               $arrayElemAt: ["$factory", 0],
//             },
//           },
//         },
//         {
//           $lookup: {
//             from: "designs",
//             localField: "designIDFK",
//             foreignField: "_id",
//             as: "design",
//           },
//         },
//         {
//           $addFields: {
//             design: {
//               $arrayElemAt: ["$design", 0],
//             },
//           },
//         },
//         {
//           $lookup: {
//             from: "takas",
//             localField: "_id",
//             foreignField: "batchIDFK",
//             as: "taka",
//           },
//         },
//         {
//           $addFields: {
//             taka: {
//               $arrayElemAt: ["$taka", 0],
//             },
//           },
//         },
//         {
//           $match: {
//             _id: mongoose.Types.ObjectId(objdata._id),
//           },
//         },
//       ],
//     ];
//     var data = new Array();
//     const aggCursor1 = batchModel.aggregate(pipeline1);
//     for await (const doc of aggCursor1) {
//       data.push(doc);
//     }

//     data.forEach(async (row) => {
//       if (row.takaStatus == null) {
//         row.takaStatus == "In Machine";
//       }
//       if ($row.takaNumber == null) {
//         $row.takaNumber = "0";
//       }

//       console.log(row.design._id);
//       const designPhotoData = await designPhotoModel.find({
//         designIDFK: row.design._id,
//       });
//       if (designPhotoData != null) {
//         row.pathImage = designPhotoData[0].pathImage;
//       }
//       var taka = null;
//       const taka = await takaModel.find({
//         isActive: true,
//         batchIDFK: row._id,
//         takaStatus: row.taka.takaStatus,
//       });
//     });
//   }

//   if (objdata != null) {
//     res.json({ result: "success", msg: "User List Found", data: objdata });
//   } else {
//     res.json({ result: "failure", msg: "User List Not Found", data: objdata });
//   }
// });

router.get("/getAllBatch", async (req, res) => {
  const objdata = await batchModel
    .find()
    .populate("designIDFK", ["designIDFK"])
    .populate("machineIDFK", ["machineIDFK"])
    .populate("machineIDFK", ["factoryIDFK"]);
  if (objdata != null) {
    res.json({ result: "success", msg: "User List Found", data: objdata });
  } else {
    res.json({ result: "failure", msg: "User List Not Found", data: objdata });
  }
});

//============== State API ==========

router.post("/addState", async (req, res) => {
  var state = new stateModel();
  state.stateName = req.body.stateName;
  state.addOn = req.body.addOn;
  state.isActive = req.body.isActive;

  const objdata = await state.save();

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "User Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.get("/deleteState/:id", async (req, res) => {
  const objdata = await stateModel.updateOne(
    { _id: req.params.id },
    {
      isActive: false,
    }
  );
  res.send(objdata);
});

router.get("/getByStateID/:id", async (req, res) => {
  const objdata = await stateModel.findOne({ _id: req.params.id });
  res.send(objdata);
  if (objdata != null) {
    res.json({ result: "success", msg: "State List Found", data: 1 });
  } else {
    res.json({ result: "failure", msg: "State List Not Found", data: 0 });
  }
});

router.get("/getAllState", async (req, res) => {
  const objdata = await stateModel.find();
  res.send(objdata);
});

//============= City API =========

router.post("/addCity", async (req, res) => {
  var city = new cityModel();
  city.cityName = req.body.cityName;
  city.addOn = req.body.addOn;
  city.isActive = req.body.isActive;
  //==FK
  city.stateIDFK = req.body.stateIDFK;

  const objdata = await city.save();

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "State Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.get("/deleteCity/:id", async (req, res) => {
  const objdata = await cityModel.updateOne(
    { _id: req.params.id },
    {
      isActive: false,
    }
  );
  res.send(objdata);
});

router.post("/getByCityID", async (req, res) => {
  const objdata = await cityModel
    .findOne({ _id: req.body.id })
    .populate("stateIDFK", "state");
  res.send(objdata);

  // const city = [];
  // const state = [];
  // states.cities.forEach((data) => {
  //   if (data["state"] === objdata.stateIDFK.stateName) {
  //     city.push(data["name"]);
  //   }
  // });
  // states.cities.forEach((data) => {
  //   state.push(data["state"]);
  // });
  // res.send(city);
  // res.send(state);

  if (objdata != null) {
    res.json({ result: "success", msg: "State List Found", data: 1 });
  } else {
    res.json({ result: "failure", msg: "State List Not Found", data: 0 });
  }
});

router.get("/getAllCity", async (req, res) => {
  const objdata = await cityModel.find();
  res.send(objdata);
});

// //========== Defect API ==========

// router.post("/addDefect", async (req, res) => {
//   var defect = new defectModel();
//   defect.defectName = req.body.defectName;
//   defect.addOn = req.body.addOn;
//   defect.isActive = req.body.isActive;

//   const objdata = await defect.save();

//   if (objdata != null) {
//     res.json({
//       result: "success",
//       msg: "User Add Successfully",
//       data: 1,
//     });
//   } else {
//     res.json({
//       result: "fail",
//       msg: "Not Inserted",
//       data: 0,
//     });
//   }
// });

// router.post("/updateDefect", async (req, res) => {
//   const objdata = await defectModel.updateOne(
//     { _id: req.body.id },
//     {
//       defectName: req.body.defectName,
//       addOn: req.body.addOn,
//       isActive: req.body.isActive,
//     }
//   );

//   if (objdata != null) {
//     res.json({ result: "success", msg: "User Updated Successfully", data: 1 });
//   } else {
//     res.json({ result: "failure", msg: "Unsuccessful", data: 0 });
//   }
// });

// router.get("/deleteDefect/:id", async (req, res) => {
//   const objdata = await defectModel.updateOne(
//     { _id: req.params.id },
//     {
//       isActive: false,
//     }
//   );
//   res.send(objdata);
// });

// router.get("/getByDefectID/:id", async (req, res) => {
//   const objdata = await defectModel.findOne({ _id: req.params.id });
//   res.send(objdata);
//   if (objdata != null) {
//     res.json({ result: "success", msg: "User List Found", data: 1 });
//   } else {
//     res.json({ result: "failure", msg: "User List Not Found", data: 0 });
//   }
// });

// router.get("/getAllDefect", async (req, res) => {
//   const objdata = await defectModel.find();
//   res.send(objdata);
// });

//=========== Design API ===============

router.post("/addDesign", upload.array("pic", 10), async (req, res) => {
  console.log(req.files);
  var design = new designModel();
  design.designNo = req.body.designNo;
  design.designQuality = req.body.designQuality;
  design.designDes = req.body.designDes;
  design.designType = req.body.designType;
  design.machineType = req.body.machineType;
  design.designer = req.body.designer;
  design.designHook = req.body.designHook;
  design.designSheddingPattern = req.body.designSheddingPattern;
  design.designTotalPick = req.body.designTotalPick;
  design.designReed = req.body.designReed;
  design.designPickInch = req.body.designPickInch;
  design.createdBy = req.body.createdBy;
  design.createdDateTime = new Date();
  design.addOn = new Date();
  design.isActive = "true";

  const objdata = await design.save();

  for (const file of req.files) {
    var designP = new designPhotoModel();
    designP.pathImage = file.filename;
    designP.createdBy = req.body.createdBy;
    designP.createdDateTime = new Date();
    designP.addOn = new Date();
    designP.isActive = "true";
    //==FK
    designP.designIDFK = objdata._id;

    await designP.save();
  }
  var stock = new stockModel();
  stock.fresh = "0";
  stock.second = "0";
  stock.returned = "0";
  stock.total = "0";
  stock.cl = "0";
  stock.createdDateTime = new Date();
  stock.addOn = new Date();
  stock.isActive = "true";
  //==FK
  stock.designIDFK = objdata._id;

  const objdata1 = await stock.save();

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Design Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.post("/updateDesign", async (req, res) => {
  const objdata = await designModel.updateOne(
    { _id: req.body.id },
    {
      designNo: req.body.designNo,
      designQuality: req.body.designQuality,
      designDes: req.body.designDes,
      designType: req.body.designType,
      machineType: req.body.machineType,
      designer: req.body.designer,
      designHook: req.body.designHook,
      designSheddingPattern: req.body.designSheddingPattern,
      designTotalPick: req.body.designTotalPick,
      designReed: req.body.designReed,
      designPickInch: req.body.designPickInch,
      createdBy: req.body.createdBy,
      modifiedDateTime: new Date(),
      isActive: req.body.isActive,
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Design Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/deleteDesign", async (req, res) => {
  const objdata = await designModel.updateOne(
    { _id: req.body.id },
    {
      isActive: false,
    }
  );
  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Design Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/getByDesignID", async (req, res) => {
  const objdata = await designModel
    .findOne({ _id: req.body.id })
    .populate("machineIDFK", ["machineType"]);
  if (objdata != null) {
    res.json({ result: "success", msg: "User List Found", data: objdata });
  } else {
    res.json({ result: "failure", msg: "User List Not Found", data: objdata });
  }
});

// router.get("/getByDesignID/:id", async (req, res) => {
//   const objdata = await designModel
//     .findOne({ _id: req.params.id })
//     .populate("machineIDFK", "machine")
//     .populate("machineType", "machine");
//   res.send(objdata);

//   if (objdata != null) {
//     res.json({ result: "success", msg: "Machine List Found", data: 1 });
//   } else {
//     res.json({ result: "failure", msg: "Machine List Not Found", data: 0 });
//   }
// });

router.post("/getAllDesign", async (req, res) => {
  var sortvalue;
  if (req.body.sortingOrder == "Design Number High To Low") {
    sortvalue = -1;
  } else {
    sortvalue = 1;
  }

  const objdata = await designModel
    .find({ isActive: true })
    .populate("machineIDFK", ["machineType"])
    .sort({ designNo: sortvalue });

  var objDesign = new Array();
  for (const design of objdata) {
    var element = JSON.parse(JSON.stringify(design));
    // console.log(design._id);
    const pathValue = await designPhotoModel.findOne({
      isActive: true,
      designIDFK: design._id,
    });
    // console.log(pathValue);
    if (pathValue != null) {
      element.pathImage = "upload/" + pathValue.pathImage;
    } else {
      element.pathImage = "upload/noImage.png";
    }

    const foldingDoneValue = await stockModel.findOne({
      isActive: true,
      designIDFK: design._id,
    });

    if (foldingDoneValue != null) {
      element.foldingDone = foldingDoneValue.foldingDone;
    } else {
      element.foldingDone = "0";
    }

    const pedingValue = await orderItemsModel.find({
      isActive: true,
      designIDFK: design._id,
    });

    var pendingSum = 0;
    for (const item of pedingValue) {
      pendingSum += parseInt(item.orderItemsToDeliver);
    }

    // console.log(pendingSum);

    if (pendingSum != 0) {
      element.pending =
        pendingSum -
        (parseInt(foldingDoneValue.foldingDone) +
          parseInt(foldingDoneValue.fresh));
      if (element.pending < 0) {
        element.pending = 0;
      }
    } else {
      element.pending = "0";
    }

    // console.log(element);

    objDesign.push(element);
  }
  // console.log(objDesign);
  if (objDesign != null) {
    res.json({ result: "success", msg: "User List Found", data: objDesign });
  } else {
    res.json({
      result: "failure",
      msg: "User List Not Found",
      data: objDesign,
    });
  }
});

//========== Factory API ============

router.post("/addFactory", async (req, res) => {
  var factory = new factoryModel();
  factory.factoryName = req.body.factoryName;
  factory.factoryPrefix = req.body.factoryPrefix;
  factory.factoryAddress = req.body.factoryAddress;
  factory.createdBy = req.body.createdBy;
  factory.createdDateTime = new Date();
  factory.addOn = new Date();
  factory.isActive = "true";

  const objdata = await factory.save();

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "factory Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.post("/updateFactory", async (req, res) => {
  const objdata = await factoryModel.updateOne(
    { _id: req.body.id },
    {
      factoryName: req.body.factoryName,
      factoryPrefix: req.body.factoryPrefix,
      factoryAddress: req.body.factoryAddress,
      createdBy: req.body.createdBy,
      modifiedDateTime: new Date(),
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "factory Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/deleteFactory", async (req, res) => {
  const objdata = await factoryModel.updateOne(
    { _id: req.body.id },
    {
      isActive: false,
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "factory Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/getByFactoryID", async (req, res) => {
  const objdata = await factoryModel.findOne({ _id: req.body.id });

  if (objdata != null) {
    res.json({ result: "success", msg: "Factory List Found", data: objdata });
  } else {
    res.json({
      result: "failure",
      msg: "Factory List Not Found",
      data: objdata,
    });
  }
});

router.get("/getAllFactory", async (req, res) => {
  const objdata = await factoryModel.find({ isActive: true });

  if (objdata != null) {
    res.json({ result: "success", msg: "Factory List Found", data: objdata });
  } else {
    res.json({
      result: "failure",
      msg: "Factory List Not Found",
      data: objdata,
    });
  }
});

//============ Machine API ===========

router.post("/addMachine", async (req, res) => {
  var machine = new machineModel();
  machine.machineNumber = req.body.machineNumber;
  machine.machineType = req.body.machineType;
  machine.machineSheddingPattern = req.body.machineSheddingPattern;
  machine.createdBy = req.body.createdBy;
  machine.createdDateTime = new Date();
  machine.addOn = new Date();
  machine.isActive = "true";
  //==FK
  machine.factoryIDFK = req.body.factoryIDFK;

  const objdata = await machine.save();

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Machine Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.post("/updateMachine", async (req, res) => {
  const objdata = await machineModel.updateOne(
    { _id: req.body.id },
    {
      machineNumber: req.body.machineNumber,
      machineType: req.body.machineType,
      machineSheddingPattern: req.body.machineSheddingPattern,
      modifiedDateTime: new Date(),
      //==FK
      factoryIDFK: req.body.factoryIDFK,
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Machine Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/deleteMachine", async (req, res) => {
  const objdata = await machineModel.updateOne(
    { _id: req.body.id },
    {
      isActive: false,
    }
  );
  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Machine Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/getByMachineID", async (req, res) => {
  const objdata = await machineModel
    .findOne({ _id: req.body.id })
    .populate("factoryIDFK", [
      "factoryName",
      "factoryPrefix",
      "factoryAddress",
    ]);

  if (objdata != null) {
    res.json({ result: "success", msg: "Machine List Found", data: objdata });
  } else {
    res.json({
      result: "failure",
      msg: "Machine List Not Found",
      data: objdata,
    });
  }
});

router.post("/listMachine", async (req, res) => {
  var sortvalue;
  if (req.body.strSort == "Machine Number Low To High") {
    sortvalue = 1;
  } else {
    sortvalue = -1;
  }

  const objdata = await machineModel
    .find({ isActive: true })
    .populate("factoryIDFK", ["factoryName", "factoryPrefix", "factoryAddress"])
    .sort({ machineNumber: sortvalue });
  if (objdata != null) {
    res.json({ result: "success", msg: "Machine List Found", data: objdata });
  } else {
    res.json({
      result: "failure",
      msg: "Machine List Not Found",
      data: objdata,
    });
  }
});

router.post("/getMachineBySelection", async (req, res) => {
  const objdata = await machineModel
    .findOne({
      machineType: req.body.machineType,
      machineNumber: req.body.machineNumber,
    })
    .populate("factoryIDFK", [
      "factoryName",
      "factoryPrefix",
      "factoryAddress",
    ]);

  if (objdata != null) {
    res.json({ result: "success", msg: "Machine List Found", data: objdata });
  } else {
    res.json({
      result: "failure",
      msg: "Machine List Not Found",
      data: objdata,
    });
  }
});

router.get("/listMachineNo", async (req, res) => {
  const objdata = await machineModel
    .find()
    .populate("factoryIDFK", [
      "factoryName",
      "factoryPrefix",
      "factoryAddress",
    ]);
  if (objdata != null) {
    res.json({ result: "success", msg: "Machine List Found", data: objdata });
  } else {
    res.json({
      result: "failure",
      msg: "Machine List Not Found",
      data: objdata,
    });
  }
});

router.get("/listMachineGroup", async (req, res) => {
  const pipeline = [
    [
      {
        $lookup: {
          from: "factories",
          localField: "factoryIDFK",
          foreignField: "_id",
          as: "factoryIDFK",
        },
      },
      {
        $addFields: {
          factoryIDFK: {
            $arrayElemAt: ["$factoryIDFK", 0],
          },
        },
      },
      {
        $group: {
          _id: "$machineType",
          doc: {
            $first: "$$ROOT",
          },
          factory: {
            $first: "$factory",
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$doc",
        },
      },
    ],
  ];
  var objdata = new Array();
  const aggCursor = machineModel.aggregate(pipeline);
  for await (const doc of aggCursor) {
    objdata.push(doc);
  }

  if (objdata != null) {
    res.json({ result: "success", msg: "Machine List Found", data: objdata });
  } else {
    res.json({
      result: "failure",
      msg: "Machine List Not Found",
      data: objdata,
    });
  }
});

router.get("/getAllMachine", async (req, res) => {
  const objdata = await machineModel
    .find()
    .populate("factoryIDFK", [
      "factoryName",
      "factoryPrefix",
      "factoryAddress",
    ]);
  if (objdata != null) {
    res.json({ result: "success", msg: "Machine List Found", data: objdata });
  } else {
    res.json({
      result: "failure",
      msg: "Machine List Not Found",
      data: objdata,
    });
  }
});

//================ OrderItems API ===========

router.post("/addOrderItem", async (req, res) => {
  var orderitem = new orderItemsModel();
  orderitem.orderItemsDispatched = req.body.orderItemsDispatched;
  orderitem.orderItemsToDeliver = req.body.orderItemsToDeliver;
  orderitem.createdBy = req.body.createdBy;
  orderitem.createdDateTime = new Date();
  orderitem.addOn = new Date();
  orderitem.isActive = "true";
  //==FK
  orderitem.orderIDFK = req.body.orderIDFK;
  orderitem.orderQuantity = req.body.orderQuantity;
  orderitem.orderRate = req.body.orderRate;
  orderitem.designIDFK = req.body.designIDFK;

  const objdata = await orderitem.save();

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "OrderItem Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.post("/updateOrderItem", async (req, res) => {
  const objdata = await orderItemsModel.updateOne(
    { _id: req.body.id },
    {
      orderItemsDispatched: req.body.orderItemsDispatched,
      orderItemsToDeliver: req.body.orderItemsToDeliver,
      createdBy: req.body.createdBy,
      modifiedDateTime: new Date(),
      isActive: req.body.isActive,
      //:FK
      orderIDFK: req.body.orderIDFK,
      orderQuantity: req.body.orderQuantity,
      orderRate: req.body.orderRate,
      designIDFK: req.body.designIDFK,
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "OrderItem Updated Successfully",
      data: 1,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: 0 });
  }
});

router.get("/deleteOrderItem/:id", async (req, res) => {
  const objdata = await orderItemsModel.updateOne(
    { _id: req.params.id },
    {
      isActive: false,
    }
  );
  res.send(objdata);
});

router.post("/getByOrderItemID", async (req, res) => {
  const objdata = await orderItemsModel
    .findOne({ _id: req.body.id })
    .populate("designIDFK", ["designNo"]);

  if (objdata != null) {
    res.json({ result: "success", msg: "orderitem List Found", data: objdata });
  } else {
    res.json({
      result: "failure",
      msg: "orderitem List Not Found",
      data: objdata,
    });
  }
});

router.get("/getAllOrderItem", async (req, res) => {
  const objdata = await orderItemsModel.find();
  res.send(objdata);
});

//======== Order Model =============

router.post("/addOrder", async (req, res) => {
  var order = new orderModel();
  order.partyIDFK = req.body.partyIDFK;
  order.partyTransport = req.body.partyTransport;
  order.orderRemark = req.body.orderRemark;
  order.orderStatus = req.body.orderStatus;
  order.orderChallanNo = req.body.orderChallanNo;
  order.orderDate = req.body.orderDate;
  order.partyAgentName = req.body.partyAgentName;
  order.partyGST = req.body.partyGST;
  order.createdBy = req.body.createdBy;
  order.createdDateTime = new Date();
  order.addOn = new Date();
  order.isActive = "true";
  const objdata = await order.save();

  var orderitem = req.body.items;

  var itemArray = orderitem.split(",");
  console.log(itemArray);

  itemArray.forEach(async (s) => {
    var value = s.split(":");
    if (value[0] !== "") {
      var orderitem = new orderItemsModel();

      orderitem.designIDFK = value[0];
      orderitem.orderQuantity = value[1];
      orderitem.orderRate = value[2];
      orderitem.orderItemsToDeliver = value[1];
      orderitem.orderIDFK = objdata._id;
      orderitem.createdBy = objdata.createdBy;
      orderitem.createdDateTime = new Date();
      orderitem.addOn = new Date();
      orderitem.isActive = "true";

      const objdata1 = await orderitem.save();
    }
  });

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Order Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.post("/updateOrder", async (req, res) => {
  const objdata = await orderModel.updateOne(
    { _id: req.body.id },
    {
      partyIDFK: req.body.partyIDFK,
      partyTransport: req.body.partyTransport,
      orderRemark: req.body.orderRemark,
      orderChallanNo: req.body.orderChallanNo,
      orderDate: req.body.orderDate,
      partyAgentName: req.body.partyAgentName,
      partyGST: req.body.partyGST,
      modifiedDateTime: new Date(),
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Order Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/deleteOrder", async (req, res) => {
  const objdata = await orderModel.updateOne(
    { _id: req.body.id },
    {
      isActive: false,
    }
  );

  const objdata1 = await orderItemsModel.updateOne(
    { orderIDFK: req.body.id },
    {
      isActive: false,
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Order Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/editOrder", async (req, res) => {
  const objdata = await orderModel
    .findOne({ _id: req.body.id, isActive: true })
    .populate("partyIDFK", ["partyName"]);

  var objOrder = new Array();
  var element = JSON.parse(JSON.stringify(objdata));

  const pipeline = [
    [
      {
        $lookup: {
          from: "designs",
          localField: "designIDFK",
          foreignField: "_id",
          as: "design",
        },
      },
      {
        $addFields: {
          design: {
            $arrayElemAt: ["$design", 0],
          },
        },
      },
      {
        $lookup: {
          from: "stocks",
          localField: "design._id",
          foreignField: "designIDFK",
          as: "stock",
        },
      },
      {
        $addFields: {
          stock: {
            $arrayElemAt: ["$stock", 0],
          },
        },
      },
      {
        $match: {
          orderIDFK: objdata._id,
        },
      },
    ],
  ];
  var items = Array();
  const aggCursor = orderItemsModel.aggregate(pipeline);
  for await (const doc of aggCursor) {
    items.push(doc);
  }
  element.items = items;
  objOrder.push(element);

  if (objOrder != null) {
    res.json({ result: "success", msg: "order List Found", data: objOrder });
  } else {
    res.json({
      result: "failure",
      msg: "order List Not Found",
      data: objOrder,
    });
  }
});

// router.post("/listOrderByStatus", async (req, res) => {
//   var objdata = [];
//   if (req.body.orderStatus === "all") {
//     objdata = await orderModel
//       .find({ isActive: true })
//       .populate("partyIDFK", ["partyName"]);
//   } else {
//     objdata = await orderModel
//       .find({ orderStatus: req.body.orderStatus, isActive: true })
//       .populate("partyIDFK", ["partyName"]);
//   }

//   if (objdata != null) {
//     var objOrder = new Array();
//     for (const order of objdata) {
//       var element = JSON.parse(JSON.stringify(order));
//       const pipeline = [
//         [
//           {
//             $lookup: {
//               from: "designs",
//               localField: "designIDFK",
//               foreignField: "_id",
//               as: "design",
//             },
//           },
//           {
//             $addFields: {
//               design: {
//                 $arrayElemAt: ["$design", 0],
//               },
//             },
//           },
//           {
//             $lookup: {
//               from: "stocks",
//               localField: "design._id",
//               foreignField: "designIDFK",
//               as: "stock",
//             },
//           },
//           {
//             $addFields: {
//               stock: {
//                 $arrayElemAt: ["$stock", 0],
//               },
//             },
//           },
//           {
//             $match: {
//               orderIDFK: order._id,
//             },
//           },
//         ],
//       ];
//       var items = Array();
//       const aggCursor = orderItemsModel.aggregate(pipeline);
//       for await (const doc of aggCursor) {
//         items.push(doc);
//       }
//       element.items = items;
//       objOrder.push(element);
//     }

//     if (objOrder != null) {
//       res.json({ result: "success", msg: "order List Found", data: objOrder });
//     } else {
//       res.json({
//         result: "failure",
//         msg: "order List Not Found",
//         data: objOrder,
//       });
//     }
//   } else {
//     res.json({
//       result: "failure",
//       msg: "order List Not Found",
//       data: objdata,
//     });
//   }
// });

router.post("/listOrderByStatus", async (req, res) => {
  var objdata = [];
  if (req.body.orderStatus === "all") {
    const pipeline1 = [
      [
        {
          $lookup: {
            from: "parties",
            localField: "partyIDFK",
            foreignField: "_id",
            as: "party",
          },
        },
        {
          $addFields: {
            party: {
              $arrayElemAt: ["$party", 0],
            },
          },
        },
        {
          $match: {
            isActive: true,
          },
        },
      ],
    ];
    const aggCursor = orderModel.aggregate(pipeline1);
    for await (const doc of aggCursor) {
      objdata.push(doc);
    }
  } else {
    const pipeline2 = [
      [
        {
          $lookup: {
            from: "parties",
            localField: "partyIDFK",
            foreignField: "_id",
            as: "party",
          },
        },
        {
          $addFields: {
            party: {
              $arrayElemAt: ["$party", 0],
            },
          },
        },
        {
          $match: {
            isActive: true,
            orderStatus: req.body.orderStatus,
          },
        },
      ],
    ];
    const aggCursor = orderModel.aggregate(pipeline2);
    for await (const doc of aggCursor) {
      objdata.push(doc);
    }
  }

  if (objdata != null) {
    var objOrder = new Array();
    for (const order of objdata) {
      var element = JSON.parse(JSON.stringify(order));
      const pipeline = [
        [
          {
            $lookup: {
              from: "designs",
              localField: "designIDFK",
              foreignField: "_id",
              as: "design",
            },
          },
          {
            $addFields: {
              design: {
                $arrayElemAt: ["$design", 0],
              },
            },
          },
          {
            $lookup: {
              from: "stocks",
              localField: "design._id",
              foreignField: "designIDFK",
              as: "stock",
            },
          },
          {
            $addFields: {
              stock: {
                $arrayElemAt: ["$stock", 0],
              },
            },
          },
          {
            $match: {
              orderIDFK: order._id,
            },
          },
        ],
      ];
      var items = Array();
      const aggCursor = orderItemsModel.aggregate(pipeline);
      for await (const doc of aggCursor) {
        items.push(doc);
      }
      element.items = items;
      objOrder.push(element);
    }

    if (objOrder != null) {
      res.json({ result: "success", msg: "order List Found", data: objOrder });
    } else {
      res.json({
        result: "failure",
        msg: "order List Not Found",
        data: objOrder,
      });
    }
  } else {
    res.json({
      result: "failure",
      msg: "order List Not Found",
      data: objdata,
    });
  }
});

router.get("/getAllOrder", async (req, res) => {
  const objdata = await orderModel.find();
  res.send(objdata);
});

//================ OrderDispatch API ===========

router.post("/addOrderDispatch", async (req, res) => {
  var itemValue = req.body.items;
  console.log(itemValue);

  var itemArray = itemValue.split(",");

  itemArray.forEach(async (s) => {
    if (s != null) {
      var value = s.split(":");

      if (value[0] !== "") {
        // console.log(value[0]);
        // console.log(value[1]);
        // console.log(mongoose.Types.ObjectId(value[0]));
        // console.log(mongoose.Types.ObjectId(value[2]));

        if (value[1] != "0") {
          const orderdata = await orderItemsModel.findOne({
            orderIDFK: value[2],
            designIDFK: value[0],
          });
          //console.log(orderdata);

          var objdata = {};
          if (orderdata != null) {
            var orderDispatch = new orderDispatchModel();
            orderDispatch.orderItemIDFK = orderdata._id;
            orderDispatch.orderQuantity = value[1];
            orderDispatch.orderItemsDispatched = new Date();
            orderDispatch.createdBy = req.body.createdBy;
            orderDispatch.createdDateTime = new Date();
            orderDispatch.addOn = new Date();
            orderDispatch.isActive = "true";

            objdata = await orderDispatch.save();

            const stockdata = await stockModel.findOne({
              designIDFK: value[0],
            });

            var fresh = parseInt(stockdata.fresh) - parseInt(value[1]);

            var total =
              parseInt(fresh) +
              parseInt(stockdata.second) +
              parseInt(stockdata.returned) +
              parseInt(stockdata.cl);
            //console.log(total);
            const stockupdate = await stockModel.updateOne(
              { designIDFK: mongoose.Types.ObjectId(value[0]) },
              {
                fresh: fresh,
                total: total,
                createdBy: req.body.createdBy,
                modifiedDateTime: new Date(),
              }
            );
            console.log(orderdata.orderItemsDispatched);
            console.log(orderdata.orderItemsToDeliver);
            const orderItemupdate = await orderItemsModel.updateOne(
              { _id: orderdata._id },
              {
                orderItemsDispatched:
                  parseInt(orderdata.orderItemsDispatched) + parseInt(value[1]),
                orderItemsToDeliver:
                  parseInt(orderdata.orderItemsToDeliver) - parseInt(value[1]),
                modifiedDateTime: new Date(),
              }
            );
          }

          const pipeline = [
            [
              {
                $lookup: {
                  from: "designs",
                  localField: "designIDFK",
                  foreignField: "_id",
                  as: "design",
                },
              },
              {
                $addFields: {
                  design: {
                    $arrayElemAt: ["$design", 0],
                  },
                },
              },
              {
                $lookup: {
                  from: "stocks",
                  localField: "design._id",
                  foreignField: "designIDFK",
                  as: "stock",
                },
              },
              {
                $addFields: {
                  stock: {
                    $arrayElemAt: ["$stock", 0],
                  },
                },
              },
              // {
              //   $match: {
              //     orderIDFK: value[2],
              //   },
              // },
            ],
          ];

          var ordertblData = Array();
          const aggCursor = orderItemsModel.aggregate(pipeline);
          for await (const doc of aggCursor) {
            if (value[2] == doc.orderIDFK) ordertblData.push(doc);
          }
          //console.log(ordertblData);
          var c = true;
          if (ordertblData != null) {
            ordertblData.forEach((row) => {
              //console.log(row.orderItemsToDeliver);
              if (row.orderItemsToDeliver >= 1) {
                c = false;
              }
            });

            if (c === true) {
              const orderupdate = await orderModel.updateOne(
                { _id: value[2] },
                {
                  orderStatus: "Deliverd",
                  modifiedDateTime: new Date(),
                }
              );
            }
          }

          if (objdata != null) {
            res.json({
              result: "success",
              msg: "OrderDispatched Add Successfully",
              data: 1,
            });
          } else {
            res.json({
              result: "fail",
              msg: "Not Inserted",
              data: 0,
            });
          }
        }
      }
    }
  });
});

router.post("/updateOrderDispatch", async (req, res) => {
  const objdata = await orderDispatchModel.updateOne(
    { _id: req.body.id },
    {
      createdBy: req.body.createdBy,
      createdDateTime: new Date(),
      addOn: new Date(),
      isActive: req.body.isActive,
      //==FK
      orderItemID: req.body.orderItemID,
      orderQuantity: req.body.orderQuantity,
      orderItemsDispatched: req.body.orderItemsDispatched,
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "OrderItem Updated Successfully",
      data: 1,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: 0 });
  }
});

router.get("/deleteOrderDispatch/:id", async (req, res) => {
  const objdata = await orderDispatchModel.updateOne(
    { _id: req.params.id },
    {
      isActive: false,
    }
  );
  res.send(objdata);
});

router.get("/getByOrderDispatch/:id", async (req, res) => {
  const objdata = await orderDispatchModel
    .findOne({ _id: req.params.id })
    .populate("orderIDFK", "order")
    .populate("orderQuantity", "order")
    .populate("orderRate", "order")
    .populate("designIDFK", "design");

  if (objdata != null) {
    res.json({ result: "success", msg: "orderitem List Found", data: objdata });
  } else {
    res.json({
      result: "failure",
      msg: "orderitem List Not Found",
      data: objdata,
    });
  }
});

router.get("/listOrderByDispatch", async (req, res) => {
  const pipeline = [
    [
      {
        $lookup: {
          from: "orderitems",
          localField: "orderItemIDFK",
          foreignField: "_id",
          as: "orderitem",
        },
      },
      {
        $addFields: {
          orderitem: {
            $arrayElemAt: ["$orderitem", 0],
          },
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "orderitem.orderIDFK",
          foreignField: "_id",
          as: "order",
        },
      },
      {
        $addFields: {
          order: {
            $arrayElemAt: ["$order", 0],
          },
        },
      },
      {
        $group: {
          _id: {
            orderIDFK: "$order",
          },
        },
      },
    ],
  ];
  var objdata = new Array();
  const aggCursor = orderDispatchModel.aggregate(pipeline);
  for await (const doc of aggCursor) {
    objdata.push(doc);
  }

  if (objdata != null) {
    var objOrder = new Array();
    for (const order of objdata) {
      var element = JSON.parse(JSON.stringify(order));
      const pipeline1 = [
        [
          {
            $lookup: {
              from: "orderitems",
              localField: "orderItemIDFK",
              foreignField: "_id",
              as: "orderitem",
            },
          },
          {
            $addFields: {
              orderitem: {
                $arrayElemAt: ["$orderitem", 0],
              },
            },
          },
          {
            $lookup: {
              from: "designs",
              localField: "orderitem.designIDFK",
              foreignField: "_id",
              as: "design",
            },
          },
          {
            $addFields: {
              design: {
                $arrayElemAt: ["$design", 0],
              },
            },
          },
        ],
      ];

      var items = Array();
      const aggCursor1 = orderDispatchModel.aggregate(pipeline1);
      for await (const doc of aggCursor1) {
        if (
          order._id.orderIDFK._id.toString() ===
          doc.orderitem.orderIDFK.toString()
        ) {
          items.push(doc);
        }
      }
      element.items = items;
      objOrder.push(element);
    }
  }

  if (objOrder != null) {
    res.json({
      result: "success",
      msg: "orderitem List Found",
      data: objOrder,
    });
  } else {
    res.json({
      result: "failure",
      msg: "orderitem List Not Found",
      data: objOrder,
    });
  }
});

router.get("/getAllOrderDispatch", async (req, res) => {
  const objdata = await orderDispatchModel.find();
  if (objdata != null) {
    res.json({ result: "success", msg: "orderitem List Found", data: objdata });
  } else {
    res.json({
      result: "failure",
      msg: "orderitem List Not Found",
      data: objdata,
    });
  }
});

//======== Particular Model =========

router.post("/addParticular", async (req, res) => {
  var particular = new particularModel();
  particular.particular = req.body.particular;
  particular.particularQtyTaka = req.body.particularQtyTaka;
  particular.particularWeight = req.body.particularWeight;
  particular.createdBy = req.body.createdBy;
  particular.createdDateTime = new Date();
  particular.addOn = new Date();
  particular.isActive = req.body.isActive;
  //==FK
  particular.factoryOutIDFK = req.body.factoryOutIDFK;

  const objdata = await particular.save();

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Particular Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.post("/updateParticular", async (req, res) => {
  const objdata = await particularModel.updateOne(
    { _id: req.body.id },
    {
      particular: req.body.particular,
      particularQtyTaka: req.body.particularQtyTaka,
      particularWeight: req.body.particularWeight,
      createdBy: req.body.createdBy,
      modifiedDateTime: new Date(),
      //==FK
      factoryOutIDFK: req.body.factoryOutIDFK,
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Particular Updated Successfully",
      data: 1,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: 0 });
  }
});

router.post("/deleteParticular", async (req, res) => {
  const objdata = await particularModel.updateOne(
    { _id: req.body.id },
    {
      isActive: false,
    }
  );
  if (objdata != null) {
    res.json({ result: "success", msg: "factoryout List Found", data: true });
  } else {
    res.json({
      result: "failure",
      msg: "factoryout List Not Found",
      data: false,
    });
  }
});

router.post("/getByParticlarID", async (req, res) => {
  const objdata = await particularModel
    .findOne({ _id: req.body.id })
    .populate("factoryOutIDFK", "factoryout");

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "factoryout List Found",
      data: objdata,
    });
  } else {
    res.json({
      result: "failure",
      msg: "factoryout List Not Found",
      data: objdata,
    });
  }
});

router.get("/getAllParticular", async (req, res) => {
  const objdata = await particularModel.find();
  if (objdata != null) {
    res.json({
      result: "success",
      msg: "factoryout List Found",
      data: objdata,
    });
  } else {
    res.json({
      result: "failure",
      msg: "factoryout List Not Found",
      data: objdata,
    });
  }
});

//============== party Api =================

router.post("/addParty", async (req, res) => {
  var party = new partyModel();
  party.partyName = req.body.partyName;
  party.partyContactNo = req.body.partyContactNo;
  party.partyPlace = req.body.partyPlace;
  party.partyOwner = req.body.partyOwner;
  party.partyAgentName = req.body.partyAgentName;
  party.agentContact = req.body.agentContact;
  party.partyGST = req.body.partyGST;
  party.partyTransport = req.body.partyTransport;
  party.createdBy = req.body.createdBy;
  party.createdDateTime = new Date();
  party.addOn = new Date();
  party.isActive = "true";

  const objdata = await party.save();

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Particular Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.post("/updateParty", async (req, res) => {
  const objdata = await partyModel.updateOne(
    { _id: req.body.id },
    {
      partyName: req.body.partyName,
      partyContactNo: req.body.partyContactNo,
      partyPlace: req.body.partyPlace,
      partyOwner: req.body.partyOwner,
      partyAgentName: req.body.partyAgentName,
      agentContact: req.body.agentContact,
      partyGST: req.body.partyGST,
      partyTransport: req.body.partyTransport,
      modifiedDateTime: new Date(),
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Particular Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/deleteParty", async (req, res) => {
  const objdata = await partyModel.updateOne(
    { _id: req.body.id },
    {
      isActive: false,
    }
  );
  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Particular Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/getByPartyID/", async (req, res) => {
  const objdata = await partyModel.findOne({ _id: req.body.id });

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "factoryout List Found",
      data: objdata,
    });
  } else {
    res.json({
      result: "failure",
      msg: "factoryout List Not Found",
      data: objdata,
    });
  }
});

router.get("/getAllParty", async (req, res) => {
  const objdata = await partyModel.find({ isActive: true });
  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Particular Updated Successfully",
      data: objdata,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: objdata });
  }
});

//============ taka Api ====================

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

router.post("/addTaka", async (req, res) => {
  var taka = new takaModel();
  taka.batchIDFK = req.body.batchIDFK;
  taka.takaNumber = req.body.takaNumber;
  taka.beamNumber = req.body.beamNumber;
  taka.noOfSarees = req.body.noOfSarees;
  taka.takaMeter = req.body.takaMeter;
  taka.takaWeight = req.body.takaWeight;
  taka.takaQuality = req.body.takaQuality;
  taka.createdBy = req.body.createdBy;
  taka.defect = req.body.defect;
  taka.takaRemark = req.body.takaRemark;
  taka.takaStatus = "Folding Done";
  taka.serialNumber = between(10, 200);

  taka.processor_mill = "";
  taka.company_mill = "";
  taka.processor_butta = "";
  taka.company_butta = "";
  taka.processor_border = "";
  taka.company_border = "";
  taka.fresh = "";
  taka.second = "";
  taka.cl = "";
  taka.createdDateTime = new Date();
  taka.addOn = new Date();
  taka.isActive = "true";
  //==FK

  const objdata = await taka.save();

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "taka Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.post("/updateTakaDetails", async (req, res) => {
  const objdata = await takaModel.updateOne(
    { _id: req.body.id },
    {
      takaNumber: req.body.takaNumber,
      beamNumber: req.body.beamNumber,
      noOfSarees: req.body.noOfSarees,
      takaMeter: req.body.takaMeter,
      takaWeight: req.body.takaWeight,
      takaQuality: req.body.takaQuality,
      defect: req.body.defect,
      takaRemark: req.body.takaRemark,
      modifiedDateTime: new Date(),
      takaStatus: "In Folding",
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "taka Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/updateDesignStock", async (req, res) => {
  var fresh = 0;
  var total = 0;
  var foldingDone = 0;
  var cl = 0;
  const pipeline = [
    [
      {
        $lookup: {
          from: "batches",
          localField: "batchIDFK",
          foreignField: "_id",
          as: "batch",
        },
      },
      {
        $addFields: {
          batch: {
            $arrayElemAt: ["$batch", 0],
          },
        },
      },
      {
        $lookup: {
          from: "machines",
          localField: "batch.machineIDFK",
          foreignField: "_id",
          as: "machine",
        },
      },
      {
        $addFields: {
          machine: {
            $arrayElemAt: ["$machine", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designs",
          localField: "batch.designIDFK",
          foreignField: "_id",
          as: "design",
        },
      },
      {
        $addFields: {
          design: {
            $arrayElemAt: ["$design", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designphotos",
          localField: "design._id",
          foreignField: "designIDFK",
          as: "designPhoto",
        },
      },
      {
        $addFields: {
          designPhoto: {
            $arrayElemAt: ["$designPhoto", 0],
          },
        },
      },
      {
        $lookup: {
          from: "stocks",
          localField: "design._id",
          foreignField: "designIDFK",
          as: "stock",
        },
      },
      {
        $addFields: {
          stock: {
            $arrayElemAt: ["$stock", 0],
          },
        },
      },
      {
        $lookup: {
          from: "factories",
          localField: "machine.factoryIDFK",
          foreignField: "_id",
          as: "factory",
        },
      },
      {
        $addFields: {
          factory: {
            $arrayElemAt: ["$factory", 0],
          },
        },
      },
      {
        $match: {
          isActive: "true",
        },
      },
      {
        $sort: {
          serialNumber: 1,
        },
      },
    ],
  ];
  var objdata = new Array();
  const aggCursor = takaModel.aggregate(pipeline);
  for await (const doc of aggCursor) {
    if (req.body.id == doc._id) objdata.push(doc);
  }

  console.log(objdata[0].stock._id.toString());
  if (objdata[0].stock != null) {
    console.log("inside If condition");
    console.log(objdata[0].design.designType);
    if (objdata[0].design.designType == "All Over") {
      console.log("in");
      fresh =
        parseInt(objdata[0].noOfSarees) + parseInt(objdata[0].stock.fresh);
      total = parseInt(objdata[0].fresh) + parseInt(objdata[0].stock.returned);
      foldingDone =
        parseInt(objdata[0].stock.foldingDone) -
        parseInt(objdata[0].noOfSarees);
    }
  } else {
    console.log("else");

    fresh = parseInt(objdata[0].fresh) + parseInt(objdata[0].stock.fresh);
    second = parseInt(objdata[0].second) + parseInt(objdata[0].stock.second);
    cl = parseInt(objdata[0].cl) - parseInt(objdata[0].stock.cl);
    total =
      [parseInt(objdata[0].fresh) + parseInt(objdata[0].second)] +
      [parseInt(objdata[0].stock.returned) + parseInt(objdata[0].cl)];
    foldingDone =
      parseInt(objdata[0].foldingDone) - parseInt(objdata[0].noOfSarees);
  }
  const stockdata = await stockModel.updateOne(
    { _id: objdata[0].stock._id.toString() },
    {
      fresh: fresh,
      total: total,
      foldingDone: foldingDone,
      cl: cl,
    }
  );
  var objdataUpdated = new Array();
  const aggCursorUpdated = takaModel.aggregate(pipeline);
  for await (const doc of aggCursorUpdated) {
    if (req.body._id == doc._id) objdataUpdated.push(doc);
  }

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "Taka List Found",
      data: 1,
    });
  } else {
    res.json({
      result: "failure",
      msg: "Taka List Not Found",
      data: 0,
    });
  }
});

router.post("/updateStatusTaka", async (req, res) => {
  const pipeline = [
    [
      {
        $lookup: {
          from: "batches",
          localField: "batchIDFK",
          foreignField: "_id",
          as: "batch",
        },
      },
      {
        $addFields: {
          batch: {
            $arrayElemAt: ["$batch", 0],
          },
        },
      },
      {
        $lookup: {
          from: "machines",
          localField: "batch.machineIDFK",
          foreignField: "_id",
          as: "machine",
        },
      },
      {
        $addFields: {
          machine: {
            $arrayElemAt: ["$machine", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designs",
          localField: "batch.designIDFK",
          foreignField: "_id",
          as: "design",
        },
      },
      {
        $addFields: {
          design: {
            $arrayElemAt: ["$design", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designphotos",
          localField: "design._id",
          foreignField: "designIDFK",
          as: "designPhoto",
        },
      },
      {
        $addFields: {
          designPhoto: {
            $arrayElemAt: ["$designPhoto", 0],
          },
        },
      },
      {
        $lookup: {
          from: "stocks",
          localField: "design._id",
          foreignField: "designIDFK",
          as: "stock",
        },
      },
      {
        $addFields: {
          stock: {
            $arrayElemAt: ["$stock", 0],
          },
        },
      },
      {
        $lookup: {
          from: "factories",
          localField: "machine.factoryIDFK",
          foreignField: "_id",
          as: "factory",
        },
      },
      {
        $addFields: {
          factory: {
            $arrayElemAt: ["$factory", 0],
          },
        },
      },
      {
        $match: {
          isActive: "true",
        },
      },
      {
        $sort: {
          serialNumber: 1,
        },
      },
    ],
  ];
  var objdata = new Array();
  const aggCursor = takaModel.aggregate(pipeline);
  for await (const doc of aggCursor) {
    if (req.body.id == doc._id) objdata.push(doc);
  }

  var statusValue = req.body.status;
  var updated = await takaModel.updateOne(
    { _id: req.body.id },
    { takaStatus: statusValue }
  );
  if (statusValue === "Folding Done") {
    console.log(objdata[0].stock._id.toString());
    const stockdata = await stockModel.updateOne(
      { _id: objdata[0].stock._id.toString() },
      {
        foldingDone:
          parseInt(objdata[0].noOfSarees) +
          parseInt(objdata[0].stock.foldingDone),
      }
    );
    if (stockdata != null) {
      updated = true;
    }
  }

  if (updated) {
    res.json({
      result: "success",
      msg: "Taka List Found",
      data: true,
    });
  } else {
    res.json({
      result: "failure",
      msg: "Taka List Not Found",
      data: false,
    });
  }
});

router.post("/updateTaka", async (req, res) => {
  const objdata = await takaModel.updateOne(
    { _id: req.body.id },
    {
      fresh: req.body.fresh,
      second: req.body.second,
      cl: req.body.cl,
      takaStatus: req.body.status,
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "taka Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/updateTakaProcessor", async (req, res) => {
  console.log(req.body);
  var statusValue = req.body.takaStatus;
  var objdata;
  if (statusValue == "In Mill") {
    objdata = await takaModel.updateOne(
      { _id: req.body.id },
      {
        company_mill: req.body.company,
        processor_mill: req.body.processor,
        takaStatus: statusValue,
        modifiedDateTime: new Date(),
      }
    );
  }

  if (statusValue == "In Butta Cutting") {
    objdata = await takaModel.updateOne(
      { _id: req.body.id },
      {
        company_butta: req.body.company,
        processor_butta: req.body.processor,
        takaStatus: statusValue,
        modifiedDateTime: new Date(),
      }
    );
  }

  if (statusValue == "In Border Cutting") {
    objdata = await takaModel.updateOne(
      { _id: req.body.id },
      {
        company_border: req.body.company,
        processor_border: req.body.processor,
        takaStatus: statusValue,
        modifiedDateTime: new Date(),
      }
    );
  }

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "taka Updated Successfully",
      data: 1,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: 0 });
  }
});

router.post("/deleteTaka", async (req, res) => {
  const objdata = await takaModel.updateOne(
    { _id: req.body.id },
    {
      isActive: false,
    }
  );
  if (objdata != null) {
    res.json({
      result: "success",
      msg: "taka Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/getAllTakaList", async (req, res) => {
  var sortvalue;
  if (req.body.strSort == "Serial Number High To Low") {
    sortvalue = -1;
  } else {
    sortvalue = 1;
  }

  const pipeline = [
    [
      {
        $lookup: {
          from: "batches",
          localField: "batchIDFK",
          foreignField: "_id",
          as: "batch",
        },
      },
      {
        $addFields: {
          batch: {
            $arrayElemAt: ["$batch", 0],
          },
        },
      },
      {
        $lookup: {
          from: "machines",
          localField: "batch.machineIDFK",
          foreignField: "_id",
          as: "machine",
        },
      },
      {
        $addFields: {
          machine: {
            $arrayElemAt: ["$machine", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designs",
          localField: "batch.designIDFK",
          foreignField: "_id",
          as: "design",
        },
      },
      {
        $addFields: {
          design: {
            $arrayElemAt: ["$design", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designphotos",
          localField: "design._id",
          foreignField: "designIDFK",
          as: "designPhoto",
        },
      },
      {
        $addFields: {
          designPhoto: {
            $arrayElemAt: ["$designPhoto", 0],
          },
        },
      },
      {
        $lookup: {
          from: "stocks",
          localField: "design._id",
          foreignField: "designIDFK",
          as: "stock",
        },
      },
      {
        $addFields: {
          stock: {
            $arrayElemAt: ["$stock", 0],
          },
        },
      },
      {
        $lookup: {
          from: "factories",
          localField: "machine.factoryIDFK",
          foreignField: "_id",
          as: "factory",
        },
      },
      {
        $addFields: {
          factory: {
            $arrayElemAt: ["$factory", 0],
          },
        },
      },
      {
        $match: {
          isActive: "true",
        },
      },
      {
        $sort: {
          serialNumber: sortvalue,
        },
      },
    ],
  ];
  var objdata = new Array();
  const aggCursor = takaModel.aggregate(pipeline);
  for await (const doc of aggCursor) {
    objdata.push(doc);
  }

  if (objdata != null) {
    res.json({ result: "success", msg: "Taka List Found", data: objdata });
  } else {
    res.json({ result: "failure", msg: "Taka List Not Found", data: objdata });
  }
});

router.post("/getTakaList", async (req, res) => {
  var takaStatusValue = req.body.takaStatus;

  const pipeline = [
    [
      {
        $lookup: {
          from: "batches",
          localField: "batchIDFK",
          foreignField: "_id",
          as: "batch",
        },
      },
      {
        $addFields: {
          batch: {
            $arrayElemAt: ["$batch", 0],
          },
        },
      },
      {
        $lookup: {
          from: "machines",
          localField: "batch.machineIDFK",
          foreignField: "_id",
          as: "machine",
        },
      },
      {
        $addFields: {
          machine: {
            $arrayElemAt: ["$machine", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designs",
          localField: "batch.designIDFK",
          foreignField: "_id",
          as: "design",
        },
      },
      {
        $addFields: {
          design: {
            $arrayElemAt: ["$design", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designphotos",
          localField: "design._id",
          foreignField: "designIDFK",
          as: "designPhoto",
        },
      },
      {
        $addFields: {
          designPhoto: {
            $arrayElemAt: ["$designPhoto", 0],
          },
        },
      },
      {
        $lookup: {
          from: "factories",
          localField: "machine.factoryIDFK",
          foreignField: "_id",
          as: "factory",
        },
      },
      {
        $addFields: {
          factory: {
            $arrayElemAt: ["$factory", 0],
          },
        },
      },
      {
        $match: {
          isActive: "true",
          takaStatus: takaStatusValue,
        },
      },
      {
        $sort: {
          serialNumber: 1,
        },
      },
    ],
  ];
  var objdata = new Array();
  const aggCursor = takaModel.aggregate(pipeline);
  for await (const doc of aggCursor) {
    objdata.push(doc);
  }
  // for (design of objdata) {
  //   console.log(objdata[0].design._id);
  // }
  // var objDesign = new Array();
  // for (const design of objdata) {
  //   var element = JSON.parse(JSON.stringify(design));
  //   // console.log(design._id);
  //   const pathValue = await designPhotoModel.findOne({
  //     isActive: true,
  //     designIDFK: design._id,
  //   });
  //   // console.log(pathValue);
  //   if (pathValue != null) {
  //     element.pathImage = "upload/" + pathValue.pathImage;
  //   } else {
  //     element.pathImage = "upload/noImage.png";
  //   }

  //   objDesign.push(element);
  // }

  if (objdata != null) {
    res.json({ result: "success", msg: "Taka List Found", data: objdata });
  } else {
    res.json({ result: "failure", msg: "Taka List Not Found", data: objdata });
  }
});

router.post("/getByTakaID", async (req, res) => {
  var sortvalue;
  if (req.body.strSort == "Serial Number High To Low") {
    sortvalue = 1;
  } else {
    sortvalue = -1;
  }

  const pipeline = [
    [
      {
        $lookup: {
          from: "batches",
          localField: "batchIDFK",
          foreignField: "_id",
          as: "batch",
        },
      },
      {
        $addFields: {
          batch: {
            $arrayElemAt: ["$batch", 0],
          },
        },
      },
      {
        $lookup: {
          from: "machines",
          localField: "batch.machineIDFK",
          foreignField: "_id",
          as: "machine",
        },
      },
      {
        $addFields: {
          machine: {
            $arrayElemAt: ["$machine", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designs",
          localField: "batch.designIDFK",
          foreignField: "_id",
          as: "design",
        },
      },
      {
        $addFields: {
          design: {
            $arrayElemAt: ["$design", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designphotos",
          localField: "design._id",
          foreignField: "designIDFK",
          as: "designPhoto",
        },
      },
      {
        $addFields: {
          designPhoto: {
            $arrayElemAt: ["$designPhoto", 0],
          },
        },
      },
      {
        $lookup: {
          from: "stocks",
          localField: "design._id",
          foreignField: "designIDFK",
          as: "stock",
        },
      },
      {
        $addFields: {
          stock: {
            $arrayElemAt: ["$stock", 0],
          },
        },
      },
      {
        $lookup: {
          from: "factories",
          localField: "machine.factoryIDFK",
          foreignField: "_id",
          as: "factory",
        },
      },
      {
        $addFields: {
          factory: {
            $arrayElemAt: ["$factory", 0],
          },
        },
      },
      {
        $match: {
          isActive: "true",
        },
      },
      {
        $sort: {
          serialNumber: sortvalue,
        },
      },
    ],
  ];
  var objdata = new Array();
  const aggCursor = takaModel.aggregate(pipeline);
  for await (const doc of aggCursor) {
    if (req.body.id == doc._id) {
      objdata.push(doc);
    }
  }

  if (objdata != null) {
    res.json({ result: "success", msg: "Taka List Found", data: objdata[0] });
  } else {
    res.json({ result: "failure", msg: "Taka List Not Found", data: objdata });
  }
});

router.post("/getTakaList", async (req, res) => {
  const pipeline = [
    [
      {
        $lookup: {
          from: "batches",
          localField: "batchIDFK",
          foreignField: "_id",
          as: "batch",
        },
      },
      {
        $addFields: {
          batch: {
            $arrayElemAt: ["$batch", 0],
          },
        },
      },
      {
        $lookup: {
          from: "machines",
          localField: "batch.machineIDFK",
          foreignField: "_id",
          as: "machine",
        },
      },
      {
        $addFields: {
          machine: {
            $arrayElemAt: ["$machine", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designs",
          localField: "batch.designIDFK",
          foreignField: "_id",
          as: "design",
        },
      },
      {
        $addFields: {
          design: {
            $arrayElemAt: ["$design", 0],
          },
        },
      },
      {
        $lookup: {
          from: "designphotos",
          localField: "design._id",
          foreignField: "designIDFK",
          as: "designPhoto",
        },
      },
      {
        $addFields: {
          designPhoto: {
            $arrayElemAt: ["$designPhoto", 0],
          },
        },
      },
      {
        $lookup: {
          from: "stocks",
          localField: "design._id",
          foreignField: "designIDFK",
          as: "stock",
        },
      },
      {
        $addFields: {
          stock: {
            $arrayElemAt: ["$stock", 0],
          },
        },
      },
      {
        $lookup: {
          from: "factories",
          localField: "machine.factoryIDFK",
          foreignField: "_id",
          as: "factory",
        },
      },
      {
        $addFields: {
          factory: {
            $arrayElemAt: ["$factory", 0],
          },
        },
      },
      {
        $match: {
          isActive: "true",
        },
      },
      {
        $sort: {
          serialNumber: 1,
        },
      },
    ],
  ];
  var objdata = new Array();
  const aggCursor = takaModel.aggregate(pipeline);
  for await (const doc of aggCursor) {
    if (req.body.status == doc.status) {
      objdata.push(doc);
    }
  }

  if (objdata != null) {
    res.json({ result: "success", msg: "Taka List Found", data: objdata });
  } else {
    res.json({ result: "failure", msg: "Taka List Not Found", data: objdata });
  }
});

// router.get("/getAllTaka", async (req, res) => {
//   var sortvalue;
//   if (req.body.strSort == "Serial Number High To Low") {
//     sortvalue = 1;
//   } else {
//     sortvalue = -1;
//   }

//   const objdata = await takaModel
//     .find()
//     .populate("batchIDFK", ["machineIDFK", "designIDFK", "batch"])
//     .populate("machineIDFK", ["machineType"])
//     // .populate("designIDFK", ["design"])
//     .sort({ serialNumber: sortvalue });

//   if (objdata != null) {
//     res.json({ result: "success", msg: "Taka List Found", data: objdata });
//   } else {
//     res.json({ result: "failure", msg: "Taka List Not Found", data: objdata });
//   }
// });

//================ yarmpurchase Api===============

router.post("/addYarm", async (req, res) => {
  var yarm = new yarmModel();
  yarm.challanNumber = req.body.challanNumber;
  yarm.purchaseGrade = req.body.purchaseGrade;
  yarm.purchasePieceBox = req.body.purchasePieceBox;
  yarm.purchaselotNumber = req.body.purchaselotNumber;
  yarm.purchaseQuality = req.body.purchaseQuality;
  yarm.purchaseColor = req.body.purchaseColor;
  yarm.purchaseDate = req.body.purchaseDate;
  yarm.purchaseYarnFrom = req.body.purchaseYarnFrom;
  yarm.purchaseNetWeight = req.body.purchaseNetWeight;
  yarm.createdBy = req.body.createdBy;
  yarm.modifiedDateTime = new Date();
  yarm.createdDateTime = new Date();
  yarm.addOn = new Date();
  yarm.isActive = "true";
  //==FK
  yarm.companyIDFK = req.body.companyIDFK;
  yarm.companyName = req.body.companyName;

  const objdata = await yarm.save();

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "taka Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.post("/updateYarm", async (req, res) => {
  const objdata = await yarmModel.updateOne(
    { _id: req.body.id },
    {
      challanNumber: req.body.challanNumber,
      purchaseGrade: req.body.purchaseGrade,
      purchasePieceBox: req.body.purchasePieceBox,
      purchaselotNumber: req.body.purchaselotNumber,
      purchaseQuality: req.body.purchaseQuality,
      purchaseColor: req.body.purchaseColor,
      purchaseDate: req.body.purchaseDate,
      purchaseYarnFrom: req.body.purchaseYarnFrom,
      purchaseNetWeight: req.body.purchaseNetWeight,
      modifiedDateTime: new Date(),
      companyName: req.body.companyName,
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "taka Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/deleteYarm", async (req, res) => {
  const objdata = await yarmModel.updateOne(
    { _id: req.body.id },
    {
      isActive: false,
    }
  );
  if (objdata != null) {
    res.json({
      result: "success",
      msg: "taka Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/getByYarmID", async (req, res) => {
  const objdata = await yarmModel
    .findOne({ _id: req.body.id })
    .populate("companyIDFK", ["companyName"]);

  if (objdata != null) {
    res.json({ result: "success", msg: "Taka List Found", data: objdata });
  } else {
    res.json({ result: "failure", msg: "Taka List Not Found", data: objdata });
  }
});

router.get("/getAllYarm", async (req, res) => {
  const objdata = await yarmModel.find({ isActive: true });
  if (objdata != null) {
    res.json({ result: "success", msg: "Taka List Found", data: objdata });
  } else {
    res.json({ result: "failure", msg: "Taka List Not Found", data: objdata });
  }
});

//=========== factoryOut Api ===========

router.post("/addFactoryChallan", async (req, res) => {
  var fo = new factoryOutModel();
  fo.factoryOutSerialNo = req.body.factoryOutSerialNo;
  fo.receiverName = req.body.receiverName;
  fo.receiverAddress = req.body.receiverAddress;
  fo.companyName = req.body.companyName;
  fo.factoryOutDate = new Date();
  fo.factoryOutTime = req.body.factoryOutTime;
  fo.factoryName = req.body.factoryName;
  fo.companyAddress = req.body.companyAddress;
  fo.factoryOutWeight = req.body.factoryOutWeight;
  fo.factoryOutNumOfPiece = req.body.factoryOutNumOfPiece;
  fo.createdBy = req.body.createdBy;
  fo.createdDateTime = new Date();
  fo.addOn = new Date();
  fo.isActive = "true";
  const objdata = await fo.save();

  var itemValue = req.body.strItems;
  console.log(itemValue);

  var itemArray = itemValue.split(",");

  itemArray.forEach(async (s) => {
    if (s != null) {
      var value = s.split(":");

      console.log(value);
      var particular = new particularModel();
      particular.particular = value[0];
      particular.particularQtyTaka = value[1];
      particular.particularWeight = value[2];
      particular.factoryOutIDFK = objdata._id;
      particular.createdBy = objdata.createdBy;
      particular.createdDateTime = new Date();
      particular.addOn = new Date();
      particular.isActive = "true";

      const objdata1 = await particular.save();
    }
  });

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "taka Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.post("/updateChallan", async (req, res) => {
  const objdata = await factoryOutModel.updateOne(
    { _id: req.body.id },
    {
      receiverName: req.body.receiverName,
      receiverAddress: req.body.receiverAddress,
      companyName: req.body.companyName,
      factoryOutDate: req.body.factoryOutDate,
      factoryOutTime: req.body.factoryOutTime,
      factoryName: req.body.factoryName,
      companyAddress: req.body.companyAddress,
      factoryOutWeight: req.body.factoryOutWeight,
      factoryOutNumOfPiece: req.body.factoryOutNumOfPiece,
      modifiedDateTime: new Date(),
      addOn: new Date(),
      isActive: "true",
      //==FK
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "taka Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/deleteChallan", async (req, res) => {
  const objdata = await factoryOutModel.updateOne(
    { _id: req.body.id },
    {
      isActive: false,
    }
  );
  if (objdata != null) {
    res.json({
      result: "success",
      msg: "taka Updated Successfully",
      data: true,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: false });
  }
});

router.post("/editChallan", async (req, res) => {
  const objdata = await factoryOutModel.findOne({ _id: req.body.id });

  if (objdata != null) {
    res.json({ result: "success", msg: "Taka List Found", data: objdata });
  } else {
    res.json({ result: "failure", msg: "Taka List Not Found", data: objdata });
  }
});

router.get("/getChallanCount", async (req, res) => {
  const objdata = await factoryOutModel.find();
  if (objdata != null) {
    res.json({ result: "success", msg: "Taka List Found", data: objdata });
  } else {
    res.json({ result: "failure", msg: "Taka List Not Found", data: objdata });
  }
});

router.get("/listFactoryChallan", async (req, res) => {
  const objdata = await factoryOutModel.find({ isActive: true });

  var objDesign = new Array();
  for (const design of objdata) {
    var element = JSON.parse(JSON.stringify(design));

    element.items = await particularModel.find({
      factoryOutIDFK: design._id.toString(),
    });

    objDesign.push(element);
  }

  if (objDesign != null) {
    res.json({
      result: "success",
      msg: "factoryout List Found",
      data: objDesign,
    });
  } else {
    res.json({
      result: "failure",
      msg: "factoryout List Not Found",
      data: objDesign,
    });
  }
});

//=========== Stock Api ===========

router.post("/addStock", async (req, res) => {
  var stock = new stockModel();
  stock.fresh = req.body.fresh;
  stock.second = req.body.second;
  stock.cl = req.body.cl;
  stock.foldingDone = req.body.foldingDone;
  stock.returned = req.body.returned;
  stock.total = req.body.total;
  stock.createdBy = req.body.createdBy;
  stock.createdDateTime = new Date();
  stock.addOn = new Date();
  stock.isActive = "true";
  //==FK
  stock.designIDFK = req.body.designIDFK;

  const objdata = await stock.save();

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "taka Add Successfully",
      data: 1,
    });
  } else {
    res.json({
      result: "fail",
      msg: "Not Inserted",
      data: 0,
    });
  }
});

router.post("/updateStock", async (req, res) => {
  const objdata = await stockModel.updateOne(
    { _id: req.body.id },
    {
      fresh: req.body.fresh,
      second: req.body.second,
      cl: req.body.cl,
      foldingDone: req.body.foldingDone,
      returned: req.body.returned,
      total: req.body.total,
      createdBy: req.body.createdBy,
      modifiedDateTime: new Date(),
      addOn: new Date(),
      isActive: req.body.isActive,
      //:FK
      designIDFK: req.body.designIDFK,
    }
  );

  if (objdata != null) {
    res.json({
      result: "success",
      msg: "taka Updated Successfully",
      data: 1,
    });
  } else {
    res.json({ result: "failure", msg: "Unsuccessful", data: 0 });
  }
});

router.get("/deleteStock/:id", async (req, res) => {
  const objdata = await stockModel.updateOne(
    { _id: req.params.id },
    {
      isActive: false,
    }
  );
  res.send(objdata);
});

router.get("/getByStockID/:id", async (req, res) => {
  const objdata = await stockModel
    .findOne({ _id: req.params.id })
    .populate("companyIDFK", "company");

  if (objdata != null) {
    res.json({ result: "success", msg: "Taka List Found", data: objdata });
  } else {
    res.json({ result: "failure", msg: "Taka List Not Found", data: objdata });
  }
});

router.get("/listStock", async (req, res) => {
  const objdata = await stockModel
    .find({ isActive: true })
    .populate("designIDFK", ["designNo"]);

  var objDesign = new Array();
  for (const design of objdata) {
    //console.log(design.designIDFK._id);
    var element = JSON.parse(JSON.stringify(design));
    // console.log("designIDFK ID:");
    //console.log(design.designIDFK);
    const pathValue = await designPhotoModel.findOne({
      isActive: true,
      designIDFK: design.designIDFK,
    });
    // console.log(pathValue);
    if (pathValue != null) {
      element.pathImage = "upload/" + pathValue.pathImage;
    } else {
      element.pathImage = "upload/noImage.png";
    }
    objDesign.push(element);
  }

  if (objDesign != null) {
    res.json({ result: "success", msg: "Taka List Found", data: objDesign });
  } else {
    res.json({
      result: "failure",
      msg: "Taka List Not Found",
      data: objDesign,
    });
  }
});

router.post("/getStockByDesign", async (req, res) => {
  const objdata = await stockModel.find({ designIDFK: req.body.designIDFK });

  if (objdata != null) {
    res.json({ result: "success", msg: "Taka List Found", data: objdata });
  } else {
    res.json({
      result: "failure",
      msg: "Taka List Not Found",
      data: objdata,
    });
  }
});

router.get("/getAllStock", async (req, res) => {
  const objdata = await stockModel.find();
  res.send(objdata);
});

module.exports = router;
