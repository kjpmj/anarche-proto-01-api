const axios = require('axios');
const qs = require('querystring');

const SkillModel = {
  getSkills : (serverName, nickName) => {
    return new Promise((resolve, reject)=>{
      let uuid = '';
      let url = '';
      const encdoedNickName = encodeURIComponent(nickName);
      const skillNameList = [
        '축산', '농사', '낚시', '벌채', '채집', '채광', '연금', '요리', '공예', '기계', '금속', '인쇄', '석공', '재봉', '가죽', '무기', '목공', '건축', '손재주', '장사', '예술', '탐험'
      ];

      url = `https://archeage.xlgames.com/search?dt=characters&keyword=${encdoedNickName}&subDt=&server=${serverName}`;

      axios.get(url)
        .then(resp => {
          const body = resp.data.replace(/^\s+|\s+$/gm, '').replace(/\n/g, '');
          const regExpStr = `(?<=data-uuid=").+(?="><strong>${nickName})`;
          const regExp = new RegExp(regExpStr);
          const uuidArr = regExp.exec(body);
          let uuid = '';

          if(Array.isArray(uuidArr)){
            uuid = (uuidArr[0].toLowerCase());
          }else{
            reject('일치하는 캐릭터가 없습니다.');
            return;
          }

          url = `https://archeage.xlgames.com/characters/${uuid}/actabilities`;

          axios.get(url)
          .then((resp) => {
            const body = resp.data.replace(/^\s+|\s+$/gm, '').replace(/\n/g, '').replace(/<[\s\d\w\/="_<>\-\.:'%]+>/g, '');
            const getLaborDownPercent = (value) => {
              if(value < 30000){
                return 0;
              }else if(value >= 30000 && value < 40000){
                return 5;
              }else if(value >= 40000 && value < 50000){
                return 10;
              }else if(value >= 50000 && value < 70000){
                return 15;
              }else if(value >= 70000 && value < 150000){
                return 20;
              }else if(value >= 150000 && value < 180000){
                return 25;
              }else if(value >= 180000 && value < 230000){
                return 30;
              }else if(value >= 230000){
                return 40;
              }
            }

            const skills = skillNameList.map((skill_name, index) => {
              const regExpStr = `(?<=${skill_name})\\d+`;
              const regExp = new RegExp(regExpStr);
              const skill_value = parseInt(regExp.exec(body)[0]);
              const labor_down_percent = getLaborDownPercent(skill_value);
                return {
                  index : index,
                  skill_name : skill_name,
                  skill_value : skill_value,
                  labor_down_percent : labor_down_percent
                }
              });

            resolve(skills);
          });
        })
    });
  }
}

module.exports = SkillModel;