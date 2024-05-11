class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Searching  Feature
  searchGigs() {
    const search = this.queryStr.search
      ? {
          title: {
            $regex: this.queryStr.search,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...search });
    return this;
  }

  // Filtering Feature
  filterGigs() {}
}

export { ApiFeatures };
