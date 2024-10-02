let chai_obj = null;

const get_chai = async () => {
  if (!chai_obj) {
    const chai = await import('chai');
    const chaiHttp = await import('chai-http');
    chai.default.use(chaiHttp.default);  

    // Store expect and request for reuse
    chai_obj = { expect: chai.default.expect, request: chai.default.request };
  }
  return chai_obj;
};

module.exports = get_chai;
