// 初始化项目数组变量和所属仓库
let projectList = [
  'U-Music',
  'U-Notes',
  'U-Passwords',
  'U-Projects',
  'U-Recipes',
  'U-Settings',
  'U-Todo',
  'U-Videos',
  'U-Weather',
  'U-Workout'
];

let repository = "aliyun-esa-pages-third";

// 循环项目列表
for (let project of projectList) {

  // 可配置变量
  const config = {
    // Routine名称将以项目文件夹名称的小写作为变量
    routineName: project.toLowerCase(),
    rootDirectory: project,       // 根目录名称
    repository: repository        // 仓库名称
  };

  // 第一个fetch请求 - CreateRoutine
  fetch(`https://esa.console.aliyun.com/data/api.json?action=CreateRoutine&t=${Date.now()}`, {
    "headers": {
      "accept": "application/json",
      "accept-language": "en-US,en;q=0.9,zh;q=0.8,zh-CN;q=0.7",
      "bx-v": "2.5.36",
      "content-type": "application/x-www-form-urlencoded",
      "eagleeye-pappname": "eb362az63s@e6f797283ca3fcd",
      "eagleeye-sessionid": "1wmU3kmImO83ORo6nc57u68iIspg",
      "eagleeye-traceid": "e3b26f47" + Date.now(),
      "priority": "u=1, i",
      "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    "referrer": "https://esa.console.aliyun.com/edge/pages/creation",
    "body": `action=CreateRoutine&product=esa&params=%7B%22Name%22%3A%22${config.routineName}%22%2C%22HasAssets%22%3Atrue%7D&umid=Yab73b6094b68288c06ec2527bc29922a&collina=140%23GTfx07BvzzWFazo2%2BbauKpN8s9zKMJ%2FZzYW2jwCeWb88vOUqzpy0CqY8nTxpO9OY4zhJlp1zzX13kfgPMQrxVKwc7ph%2Fzzrb22U3l61xkPriVXE%2FtFzz2Pzexj4%2BONdOHaU%2BWFuMP1Jgh74vdvnpHTwqgKYOJKws5qXSZzwncmTow1gs%2BTxKMt7K%2BTbuOZDi5F9%2FJPk6W4LwWMF4r6EWkNo9eqWDmeQwZJcrgAVxR3ChldPaf0P%2BUd9Hgqtv1BfRYNQ0LsQQuURnupSfrK0X21G5CYfygwsu6sqF5IhkWkVxWAA3bsixICiR7H0Xz%2FTBBazJarIBblvGQ1l1dVj8Ob3kGRZn0dff76%2Fi4KDDL%2BNi24vvFzVmjjMiSqdEsd5W3TiT96AsCzH2bpBFfPYGX4mqDCsMaxFlefyYBWFRKNE3tm0HdlnR%2BJeVV%2Bi3pJvgGStZc50ni%2Bf%2FsJhiFXGELQFbPr874bPFmM342HKT92SmEWbqFBGzy4OtKwMGZbRqap1%2BnomTfv3MhhYEHjI2C6ro4oEHzSR%2FjlAuT9%2FwXwNOChzHtSaV%2FMyQQSM8TOXFI9tcGVVGhqnYhIkp4mw1NElqsZng8dwItppUaSNlreskqAv7Jc9VpBTy89Qu%2BdSk6tean3UgDYixKDb%3D&sec_token=lSTIbJV3rhmMBtY1TFGGE3&riskVersion=3.0`,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  }).then(response => {
    console.log(`[${config.project}] 第一个fetch请求完成`);
    return response;
  });

  // 间隔5秒后执行第二个fetch请求
  setTimeout(() => {
    fetch(`https://esa.console.aliyun.com/data/api.json?action=CreateRoutineBuildConfiguration&t=${Date.now()}`, {
      "headers": {
        "accept": "application/json",
        "accept-language": "en-US,en;q=0.9,zh;q=0.8,zh-CN;q=0.7",
        "bx-v": "2.5.36",
        "content-type": "application/x-www-form-urlencoded",
        "eagleeye-pappname": "eb362az63s@e6f797283ca3fcd",
        "eagleeye-sessionid": "1wmU3kmImO83ORo6nc57u68iIspg",
        "eagleeye-traceid": "e3b26f47" + Date.now(),
        "priority": "u=1, i",
        "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      "referrer": "https://esa.console.aliyun.com/edge/pages/creation",
      "body": `action=CreateRoutineBuildConfiguration&product=esa&params=%7B%22RootDirectory%22%3A%22%2F${config.rootDirectory}%22%2C%22AssetsDirectory%22%3A%22%22%2C%22NodeVersion%22%3A%2222.x%22%2C%22RoutineEntry%22%3A%22%22%2C%22RoutineName%22%3A%22${config.routineName}%22%2C%22Repository%22%3A%22${config.repository}%22%2C%22EnvironmentVariables%22%3A%7B%7D%2C%22BuildCommand%22%3A%22npm%20run%20build%22%2C%22InstallCommand%22%3A%22npm%20install%22%2C%22ProductionBranch%22%3A%22main%22%2C%22GitAccountId%22%3A4357687400212480%2C%22BuildBranches%22%3A%22main%22%7D&umid=Yab73b6094b68288c06ec2527bc29922a&collina=140%23GTfx07BvzzWFazo2%2BbauKpN8s9zKMJ%2FZzYW2jwCeWb88vOUqzpy0CqY8nTxpO9OY4zhJlp1zzX13kfgPMQrxVKwc7ph%2Fzzrb22U3l61xkPriVXE%2FtFzz2Pzexj4%2BONdOHaU%2BWFuMP1Jgh74vdvnpHTwqgKYOJKws5qXSZzwncmTow1gs%2BTxKMt7K%2BTbuOZDi5F9%2FJPk6W4LwWMF4r6EWkNo9eqWDmeQwZJcrgAVxR3ChldPaf0P%2BUd9Hgqtv1BfRYNQ0LsQQuURnupSfrK0X21G5CYfygwsu6sqF5IhkWkVxWAA3bsixICiR7H0Xz%2FTBBazJarIBblvGQ1l1dVj8Ob3kGRZn0dff76%2Fi4KDDL%2BNi24vvFzVmjjMiSqdEsd5W3TiT96AsCzH2bpBFfPYGX4mqDCsMaxFlefyYBWFRKNE3tm0HdlnR%2BJeVV%2Bi3pJvgGStZc50ni%2Bf%2FsJhiFXGELQFbPr874bPFmM342HKT92SmEWbqFBGzy4OtKwMGZbRqap1%2BnomTfv3MhhYEHjI2C6ro4oEHzSR%2FjlAuT9%2FwXwNOChzHtSaV%2FMyQQSM8TOXFI9tcGVVGhqnYhIkp4mw1NElqsZng8dwItppUaSNlreskqAv7Jc9VpBTy89Qu%2BdSk6tean3UgDYixKDb%3D&sec_token=lSTIbJV3rhmMBtY1TFGGE3&riskVersion=3.0`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }).then(response => {
      console.log(`[${config.project}] 第二个fetch请求完成`);
      return response;
    });

    // 再间隔5秒后执行第三个fetch请求
    setTimeout(() => {
      fetch(`https://esa.console.aliyun.com/data/api.json?action=CreateRoutineBuild&t=${Date.now()}`, {
        "headers": {
          "accept": "application/json",
          "accept-language": "en-US,en;q=0.9,zh;q=0.8,zh-CN;q=0.7",
          "bx-v": "2.5.36",
          "content-type": "application/x-www-form-urlencoded",
          "eagleeye-pappname": "eb362az63s@e6f797283ca3fcd",
          "eagleeye-sessionid": "1wmU3kmImO83ORo6nc57u68iIspg",
          "eagleeye-traceid": "e3b26f47" + Date.now(),
          "priority": "u=1, i",
          "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin"
        },
        "referrer": "https://esa.console.aliyun.com/edge/pages/creation",
        "body": `action=CreateRoutineBuild&product=esa&params=%7B%22RoutineName%22%3A%22${config.routineName}%22%2C%22Branch%22%3A%22main%22%7D&umid=Yab73b6094b68288c06ec2527bc29922a&collina=140%23GTfx07BvzzWFazo2%2BbauKpN8s9zKMJ%2FZzYW2jwCeWb88vOUqzpy0CqY8nTxpO9OY4zhJlp1zzX13kfgPMQrxVKwc7ph%2Fzzrb22U3l61xkPriVXE%2FtFzz2Pzexj4%2BONdOHaU%2BWFuMP1Jgh74vdvnpHTwqgKYOJKws5qXSZzwncmTow1gs%2BTxKMt7K%2BTbuOZDi5F9%2FJPk6W4LwWMF4r6EWkNo9eqWDmeQwZJcrgAVxR3ChldPaf0P%2BUd9Hgqtv1BfRYNQ0LsQQuURnupSfrK0X21G5CYfygwsu6sqF5IhkWkVxWAA3bsixICiR7H0Xz%2FTBBazJarIBblvGQ1l1dVj8Ob3kGRZn0dff76%2Fi4KDDL%2BNi24vvFzVmjjMiSqdEsd5W3TiT96AsCzH2bpBFfPYGX4mqDCsMaxFlefyYBWFRKNE3tm0HdlnR%2BJeVV%2Bi3pJvgGStZc50ni%2Bf%2FsJhiFXGELQFbPr874bPFmM342HKT92SmEWbqFBGzy4OtKwMGZbRqap1%2BnomTfv3MhhYEHjI2C6ro4oEHzSR%2FjlAuT9%2FwXwNOChzHtSaV%2FMyQQSM8TOXFI9tcGVVGhqnYhIkp4mw1NElqsZng8dwItppUaSNlreskqAv7Jc9VpBTy89Qu%2BdSk6tean3UgDYixKDb%3D&sec_token=lSTIbJV3rhmMBtY1TFGGE3&riskVersion=3.0`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      }).then(response => {
        console.log(`[${config.project}] 第三个fetch请求完成`);
        return response;
      });
    }, 20000);
  }, 20000);

}
