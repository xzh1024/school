exports.makeConfig = function(pathPrefix = "", apiPrefix = "") {
  if (!isBrowser()) {
    return {
      staticPrefix: pathPrefix,
    };
  }

  const origin =
    process.env.NODE_ENV == "development"
      ? "https://store.qa.hztl3.com"
      : location.origin;
  const apiURLPrefix = origin + apiPrefix + "/api/";
  const companyIdSuffix = getCompanyIdSuffix(pathPrefix);
  const routerPrefix = pathPrefix + companyIdSuffix;
  // prettier-ignore
  return {
    routerPrefix: routerPrefix,
    urlPrefix:    origin + routerPrefix,
    accountsURL:      apiURLPrefix + `accounts`     + companyIdSuffix,
    unitedURL:    apiURLPrefix + `goods-stocks` + companyIdSuffix,
    payURL:       apiURLPrefix + `pay`          + companyIdSuffix,
    basicURL:     apiURLPrefix + `basic`        + companyIdSuffix,
    // 跳转到某个公司
    jumpToCompany: function(companyId, path = "") {
      location.pathname = pathPrefix + "/" + companyId + path
    },
  };
};

const isBrowser = new Function(
  "try {return this===window;}catch(e){ return false;}"
);
const companyIdPrefix = new RegExp("^(/\\d+)($|/)");

function getCompanyIdSuffix(pathPrefix) {
  let path = location.pathname;
  if (pathPrefix != "") {
    if (path.substring(0, pathPrefix.length) !== pathPrefix) {
      throw "path must begin with " + pathPrefix;
    }
    path = path.substring(pathPrefix.length, path.length);
  }
  let matches = path.match(companyIdPrefix);
  if (matches) {
    return matches[1];
  }
  return "";
}
