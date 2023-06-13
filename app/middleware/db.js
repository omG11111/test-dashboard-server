const { aggregateCollection, countDocuments } = require("../shared/core");
const Country = require("../models/country");
buildErrObject = (code, message) => {
  return {
    code,
    message,
  };
};
module.exports = {
  async managedata(collection, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const condition = {};
        console.log(data, "data");
        if (data.s_end_year && data.e_end_year) {
          condition["end_year"] = {
            $exists: true,
            $gte: +data.s_end_year,
            $lte: +data.e_end_year,
          };
        }
        if (data.country) {
          condition.country = data.country;
        }
        if (data.topic && data.topic != "") {
          condition.topic = new RegExp(data.topic.trim(), "i");
        }
        if (data.sector) {
          condition.sector = data.sector;
        }

        if (data.region) {
          condition.region = data.region;
        }
        if (data.pest) {
          condition.pestle = data.pest;
        }
        if (data.source) {
          condition.source = data.source;
        }
        if (data.swot) {
          condition.impect = data.swot;
        }
        console.log(condition, "condition");
        let aggregation = [
          {
            $match: condition,
          },
        ];

        const item = await aggregateCollection(collection, [
          ...aggregation,
          {
            $skip: data.offset ? +data.offset : 0,
          },
          {
            $limit: data.limit ? +data.limit : Number.MAX_SAFE_INTEGER,
          },
        ]);
        const count = await countDocuments(collection, condition);

        resolve({
          data: item.data ?? [],
          count: count,
        });
      } catch (error) {
        reject(buildErrObject(422, error.message));
      }
    });
  },

  async getLists(collection, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const condition1 = {
          country: { $exists: true, $nin: [null, ""] },
        };
        const condition2 = {
          pestle: { $exists: true, $nin: [null, ""] },
        };
        const condition3 = {
          sector: { $exists: true, $nin: [null, ""] },
        };
        const condition4 = {
          region: { $exists: true, $nin: [null, ""] },
        };
        const condition5 = {
          source: { $exists: true, $nin: [null, ""] },
        };
        const condition6 = {
          impect: { $exists: true, $nin: [null, ""] },
        };
        const items1 = await collection.find(condition1).exec();
        const items2 = await collection.find(condition2).exec();
        const items3 = await collection.find(condition3).exec();
        const items4 = await collection.find(condition4).exec();
        const items5 = await collection.find(condition5).exec();
        const items6 = await collection.find(condition6).exec();
        let countries = Array.from(new Set(items1.map((item) => item.country)));
        let pests = Array.from(new Set(items2.map((item) => item.pestle)));
        let sectors = Array.from(new Set(items3.map((item) => item.sector)));
        let regions = Array.from(new Set(items4.map((item) => item.region)));
        let sources = Array.from(new Set(items5.map((item) => item.source)));
        let SWOT = Array.from(new Set(items6.map((item) => item.impect)));

        resolve({
          data: {
            countries: countries,
            pests: pests,
            sectors: sectors,
            regions: regions,
            sources: sources,
            SWOT: SWOT,
          },
        });
      } catch (err) {
        console.log(err, "asdfasfasf");
        reject(buildErrObject(422, err.message));
      }
    });
  },
};
