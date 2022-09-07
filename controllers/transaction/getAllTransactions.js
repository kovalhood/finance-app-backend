const { createError } = require("../../helpers");
const { Transaction } = require("../../models/transactions");

const getAllTransactions = async (req, res) => {
  const { _id: owner } = req.user;
  const { day, month, year } = req.query;

  if (!month && !year) {
    throw createError(400);
  }
  if (month.length !== 2 || year.length !== 4) {
    throw createError(400, "Format must be: `month=02&year=2022`");
  }

  const transactionsByType = await Transaction.aggregate([
    {
      $match: {
        owner: owner,
        month: month,
        year: year,
      },
    },
    {
      $group: {
        _id: {
          categories: "$categories",
          description: "$description",
          income: "$income",
          value: "$value",
        },
      },
    },
    {
      $group: {
        _id: "$_id.income",
        totalSum: { $sum: "$_id.value" },
      },
    },
    {
      $project: {
        _id: 1,
        totalSum: 1,
      },
    },
  ]);

  if (transactionsByType.length === 0) {
    throw createError(404, "No transactions for this period");
  }
  if (!transactionsByType) {
    throw createError(404);
  }
  const allTransactions = await Transaction.find(
    { owner, day, month, year },
    "-createdAt -updatedAt"
  );
  if (allTransactions.length === 0) {
    throw createError(404, "No transactions for this period");
  }

  if (!allTransactions) {
    throw createError(404);
  }

  res.json({
    status: "success",
    code: 200,
    transactionsByType,
    allTransactions,
  });
};
module.exports = getAllTransactions;
