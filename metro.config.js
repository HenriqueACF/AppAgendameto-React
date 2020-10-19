// module.exports = {
//   /* general options */

//   resolver: {
//     /* resolver options */
//   },
//   transformer: {
//     /* transformer options */
//   },
//   serializer: {
//     /* serializer options */
//   },
//   server: {
//     /* server options */
//   }
// };

const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    }
  };
})();