var fs = require('fs');

// Read original template from git
var exec = require('child_process').execSync;
var baseHtml = exec('cd "d:/Z  wechat  xaingnu/tool-station" && git show dev~2:qiugian/index.html', {encoding:'utf8'});
var cutPoint = baseHtml.indexOf('var LOT_DATA = {');
var before = baseHtml.substring(0, cutPoint);
var after = baseHtml.substring(baseHtml.indexOf('\n};', cutPoint) + 3);

// Escape helper
function esc(s) {
  return (s||'').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ').replace(/\r/g, '');
}

// Parse lot data
var base = 'd:/Z  wechat  xaingnu/tool-station/qiugian/lot_data/';
var WUXING = ['木','木','火','火','土','土','金','金','水','水'];
var DIR5 = ['东','东','南','南','中','中','西','西','北','北'];
var cats = [
  {name:'观音灵签',file:'01_观音灵签.txt'},{name:'关帝灵签',file:'02_关帝灵签.txt'},
  {name:'黄大仙灵签',file:'03_黄大仙灵签.txt'},{name:'妈祖灵签',file:'04_妈祖灵签.txt'},
  {name:'月老灵签',file:'05_月老灵签.txt'},{name:'财神灵签',file:'06_财神灵签.txt'},
  {name:'吕祖灵签',file:'07_吕祖灵签.txt'},{name:'土地公灵签',file:'08_土地公灵签.txt'},
  {name:'六十甲子签',file:'09_六十甲子签.txt'}
];

var dataParts = ['var LOT_DATA = {'];

cats.forEach(function(c){
  var t = fs.readFileSync(base + c.file, 'utf8');
  var lines = t.split('\n'), lots = [];
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (!line || line.indexOf('===') === 0 || line.indexOf('请将') === 0 || line.indexOf('签数') === 0 || line.indexOf('吉凶等级') === 0 || line.indexOf('整体风格') === 0) continue;
    var id = null, level = '', element = WUXING[0], dir = DIR5[0], isJiazi = false, m;
    if ((m = line.match(/^(\d+)\s+签\s+(上上|上吉|上平|中吉|中平|中下|下吉|下平|下下|[上中下])\s/))) { id = parseInt(m[1]); level = m[2]; }
    else if ((m = line.match(/^(\d+)\s+(上上|上吉|上平|中吉|中平|中下|下吉|下平|下下|[上中下])\s*[・·｜\|]/))) { id = parseInt(m[1]); level = m[2]; }
    else if ((m = line.match(/^(\d+)\s+(上上|上吉|上平|中吉|中平|中下|下吉|下平|下下|[上中下])\s+[一-鿿]/))) { id = parseInt(m[1]); level = m[2]; }
    else if ((m = line.match(/^(\d+)\s+\S+\s+(上上|上吉|上平|中吉|中平|中下|下吉|下平|下下|[上中下])\s/))) { id = parseInt(m[1]); level = m[2]; }
    else if ((m = line.match(/^(\d+)\s+(上上|上吉|上平|中吉|中平|中下|下吉|下平|下下|[上中下])\s*$/))) { id = parseInt(m[1]); level = m[2]; }
    else if ((m = line.match(/^(\d+)\s*【[^】]+】\s*属(金|木|水|火|土)/))) { id = parseInt(m[1]); element = m[2]; isJiazi = true; var dm = line.match(/宜(东|南|西|北|中央|中)/); dir = dm ? (dm[1] === '中央' ? '中' : dm[1]) : DIR5[(id - 1) % 5]; var lm = line.match(/[｜\|](上上|上吉|上平|中吉|中平|中下|下吉|下平|下下|[上中下]+)/); level = lm ? lm[1] : '中'; }
    if (!id) continue;
    if (!isJiazi) { element = WUXING[(id - 1) % 10]; dir = DIR5[(id - 1) % 5]; }
    var norm = level.indexOf('上上') === 0 ? '上上' : level.indexOf('上吉') === 0 || level === '上' ? '上' : level.indexOf('中') === 0 ? '中' : level.indexOf('下下') === 0 ? '下下' : level.indexOf('下') === 0 ? '下' : level;
    var nl = (lines[i + 1] || '').trim(), po = '', me = '';
    if (nl) {
      var pm = nl.match(/签诗[：:]\s*(.+?)(?:\s*典故[：:]|\s*解曰[：:]|\s*解[：:]|\s*吉凶[：:]|\s*事业[：:]|$)/); if (pm) po = pm[1].trim();
      if (!po) { var sm = nl.match(/诗曰[：:]\s*(.+?)(?:\s*解[：:]|$)/); if (sm) po = sm[1].trim(); }
      if (!po) { var pp = nl.split(/解曰[：:]|解[：:]|吉凶[：:]/); po = pp[0].replace(/签诗[：:]/,'').replace(/诗曰[：:]/,'').trim(); }
      var mm = nl.match(/解曰[：:]\s*(.+?)(?:\s*事业[：:]|$)/); if (mm) me = mm[1].trim();
      else { var mp = nl.split(/解曰[：:]|解[：:]/); if (mp.length >= 2) { var mp2 = mp[1].split(/事业[：:]/); me = mp2[0].trim(); } }
      if (!me) { var xm = nl.match(/\s解[：:]\s*(.+?)$/); if (xm) me = xm[1].trim(); }
      if (!me) me = po;
    }
    var cp = po.replace(/[，。,.]/g, '\n').replace(/\s+/g, '').trim();
    if (cp.indexOf('\n') === -1 && cp.length > 16) { var p = Math.floor(cp.length / 4); cp = cp.substring(0, p) + '\n' + cp.substring(p, p * 2) + '\n' + cp.substring(p * 2, p * 3) + '\n' + cp.substring(p * 3); }
    var pl = cp.split('\n'); if (pl.length > 4) pl = pl.slice(0, 4); cp = pl.join('\\n');
    me = esc(me);
    if (po && po.length > 2) lots.push({ id: id, level: norm, poem: cp, meaning: me, element: element, direction: dir });
  }
  dataParts.push("  '" + c.name + "': [");
  lots.forEach(function(l){
    dataParts.push("    {id:" + l.id + ",level:'" + l.level + "',element:'" + l.element + "',direction:'" + l.direction + "',poem:'" + l.poem + "',meaning:'" + l.meaning + "'},");
  });
  dataParts.push('  ],');
});
dataParts.push('};');

var output = before + dataParts.join('\n') + after;
fs.writeFileSync('d:/Z  wechat  xaingnu/tool-station/qiugian/index.html', output, 'utf8');
console.log('Done. Size:', output.length);
