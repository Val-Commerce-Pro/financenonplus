import { getGraphqlClient } from "~/utils/shopify/getGraphqlClient";

export async function createDraftOrder( variantId: String) {
  //const firstName1 = "test"
    const gqlClient = await getGraphqlClient("helge-test.myshopify.com");
    console.log("id:", variantId)
        const query = `mutation MyMutation {
            draftOrderCreate(
              input: {billingAddress: {address1: "", lastName: "test", firstName: "test", zip: "22312"}, lineItems: {quantity: 1, variantId: "gid://shopify/ProductVariant/${variantId}"}, metafields: {}}
            ) {
              userErrors {
                message
              }
              draftOrder {
                name
                id
                totalShippingPrice
              }
            }
          }`;
          console.log("query:", query)
          const draft = await gqlClient.request( query );
          return draft
  }

  export async function draftOrderComplete(id: String) {
    //const firstName1 = "test"
      const gqlClient = await getGraphqlClient("helge-test.myshopify.com");
          const query = `mutation MyMutation {
            draftOrderComplete(id: "gid://shopify/DraftOrder/${id}") {
              userErrors {
                message
              }
            }
          }`;
        
            console.log("query:", query)
            const graphQlQuery = await gqlClient.request( query );
            return graphQlQuery
    }
    export async function createDraftOrderLogged(lastName: String, address1: String, city: String,  zip: String, email: String,variantId: String) {
      //const firstName1 = "test"
        const gqlClient = await getGraphqlClient("helge-test.myshopify.com");
        console.log("id:", variantId)
            const query = `mutation MyMutation {
                draftOrderCreate(
                  input: {shippingAddress: {address1: "${address1}", lastName: "${lastName}", city: "${city}", countryCode: DE}, lineItems: {quantity: 1, variantId: "gid://shopify/ProductVariant/${variantId}"}, email: "${email}"}
                ) {
                  userErrors {
                    message
                  }
                  draftOrder {
                    name
                    id
                  }
                }
              }`;
              console.log("query:", query)
              const draft = await gqlClient.request( query );
              return draft
      }
    export async function draftOrderCalculate() {
      //const firstName1 = "test"
        const gqlClient = await getGraphqlClient("helge-test.myshopify.com");
            const query = `mutation draftOrderCalculate {
              draftOrderCalculate(
                input: {
                    lineItems: [{
                        variantId: "gid://shopify/ProductVariant/45118547493143",
                        quantity: 1
                    }],
                    shippingAddress: {
                        city: "Hamburg",
                        countryCode: DE,
                        zip: "22087"
                    }
                }
            
            ){
                calculatedDraftOrder {
                  availableShippingRates {
                      handle
                      title
                      price {
                          amount
                      }
                  }
                }
                userErrors {
                  field
                  message
                }
              }
            }`;
          
              console.log("query:", query)
              const graphQlQuery = await gqlClient.request( query );
              return graphQlQuery
      }