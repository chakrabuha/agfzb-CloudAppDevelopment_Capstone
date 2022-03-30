/**
 *
 * main() will be run when you invoke this action
 *
 * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
 *
 * @return The output of this action, which must be a JSON object.
 *
 */
 var Cloudant = require("@cloudant/cloudant");

 async function main(params) {
   const cloudant = Cloudant({
     url: params.COUCH_URL,
     plugins: { iamauth: { iamApiKey: params.IAM_API_KEY } },
   });
   try {
     let data = await cloudant.db
       .use("dealerships")
       .list({ include_docs: true });
     let entries = data.rows.map(({ doc }) => {
       let { _id, _rev, ...res } = doc;
       return res;
     });
 
     if (params.state) {
       entries = entries.filter(({ st }) => st == params.state);
     }
 
     if (params.dealerId) {
       entries = entries.filter(({ id }) => id == params.dealerId);
     }
 
     return { entries };
   } catch (error) {
     return { error: error.description };
   }
 }
 