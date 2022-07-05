class APIFeatures {
  constructor(queryModel, queryRequest) {
    this.queryModel = queryModel; // model name User.find()
    this.queryRequest = queryRequest; // API Request Query   req.query.page ect.
  }
  // Filter
  filter() {
    const queryKey = { ...this.queryRequest };
    const excludedFields = ["page", "skip", "limit"];
    excludedFields.forEach((el) => delete queryKey[el]);
    // Advanced Filtering
    let queryStr = JSON.stringify(queryKey);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Find
    if (this.queryRequest.ids) {
      const ids = this.queryRequest.ids;
      this.queryModel = this.queryModel.find({ _id: JSON.parse(ids) });
    }
    this.queryModel.find(JSON.parse(queryStr));
    return this;
  }
  // sorting
  sort() {
    if (this.queryRequest.sort) {
      let sortBy = this.queryRequest.sort.split(",").join(" ");
      this.queryModel = this.queryModel.sort(sortBy);
    } else {
      this.queryModel = this.queryModel.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryRequest.fields) {
      const fields = this.queryRequest.fields.split(",").join(" ");
      this.queryModel = this.queryModel
        .select(fields)
        .populate("message", `${fields}`);
    }
    return this;
  }

  pagination() {
    const page = this.queryRequest.page * 1 || 1;
    const limit = this.queryRequest.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.queryModel = this.queryModel.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
