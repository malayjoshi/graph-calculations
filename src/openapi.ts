export default {
    "openapi" : "3.1.0",
    "info" : {
      "title" : "Dynamo API",
      "description" : "Dynamo API",
      "version" : "1.0.0"
    },
    "servers" : [ {
      "url" : "https://Dynamo"
    } ],
    "paths" : {
      "/api/v1/flows/calculate" : {
        "post" : {
          "summary" : "POST api/v1/flows/calculate",
          "operationId" : "calculate",
          "requestBody" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/GraphDTO"
                }
              }
            },
            "required" : true
          },
          "responses" : {
            "200" : {
              "description" : "OK",
              "content" : {
                "*/*" : {
                  "schema" : {
                    "$ref" : "#/components/schemas/ResponseDTO"
                  }
                }
              }
            }
          }
        }
      }
    },
    "components" : {
      "schemas" : {
        "EdgeDTO" : {
          "type" : "object",
          "properties" : {
            "source" : {
              "type" : "string"
            },
            "target" : {
              "type" : "string"
            },
            "value" : {
              "type" : "string"
            }
          },
          "required" : [ "source", "target", "value" ]
        },
        "GraphDTO" : {
          "type" : "object",
          "properties" : {
            "calculationType" : {
              "type" : "string"
            },
            "source" : {
              "type" : "string"
            },
            "target" : {
              "type" : "string"
            },
            "nodes" : {
              "type" : "array",
              "items" : {
                "type" : "string"
              }
            },
            "edges" : {
              "type" : "array",
              "items" : {
                "$ref" : "#/components/schemas/EdgeDTO"
              }
            }
          }
        },
        "ResponseDTO" : {
          "type" : "object",
          "properties" : {
            "path" : {
              "type" : "string"
            },
            "distances" : {
              "type" : "string"
            }
          }
        }
      }
    }
  } as const
