const axios = require('axios');
const qs = require('querystring');

const SkillModel = {
  getSkills : (nickName) => {
    return new Promise((resolve, reject)=>{
      let uuid = '';
      let url = '';
      const skillNameList = [
        '축산', '농사', '낚시', '벌채', '채집', '채광', '연금', '요리', '공예', '기계', '금속', '인쇄', '석공', '재봉', '가죽', '무기', '목공', '건축', '손재주', '장사', '예술', '탐험',
        '누이안어', '엘프어', '드워프어', '하리하란어', '페레어', '워본어', '서대륙 공용어', '동대륙 공용어'
      ];

      switch(nickName){
        case '띵진':
          uuid = 'a217a416-74fe-433a-958c-f672f89ad555';
          url = `https://archeage.xlgames.com/characters/${uuid}/actabilities`;
          break;
      }

      axios.get(url)
      .then((resp) => {
        const body = resp.data.replace(/^\s+|\s+$/gm, '').replace(/\n/g, '').replace(/<[\s\d\w\/="_<>\-\.:'%]+>/g, '');

        const skills = skillNameList.map((skill_name, index) => {
          const regExpStr = `(?<=${skill_name})\\d+`;
          const regExp = new RegExp(regExpStr);
          const skill_value = parseInt(regExp.exec(body)[0]);
            return {
              index : index,
              skill_name : skill_name,
              skill_value : skill_value
            }
          });

        resolve(skills);
      });
    });
  }
}

module.exports = SkillModel;