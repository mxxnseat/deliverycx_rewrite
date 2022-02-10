export interface IGeoCodeResponse{
  response: {
      GeoObjectCollection: {
          featureMember: Array<{
              GeoObject: {
                  metaDataProperty: {
                      GeocoderMetaData: {
                          Address: {
                              Components: Array<{
                                  kind: string,
                                  name: string
                              }>
                          }
                      }
                  }
                  name: string
              }
          }>,
          metaDataProperty: {
              GeocoderResponseMetaData: {
                  found: string,
                  requrest: string,
                  results: string
              }
          }
      }
  }
}