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
     const { review } = params;
 
     let data = await cloudant.db.use("reviews").insert(review);
   } catch (error) {
     return { error: error.description };
   }
 }
 