import figure01 from './figure-01.svg';
import figure02 from './figure-02.svg';
import figure03 from './figure-03.svg';
import figure04 from './figure-04.svg';
import figure05 from './figure-05.svg';
import figure06 from './figure-06.svg';
import figure07 from './figure-07.svg';
import figure08 from './figure-08.svg';
import figure09 from './figure-09.svg';
import figure10 from './figure-10.svg';
import figure11 from './figure-11.svg';
import figure12 from './figure-12.svg';
import figure13 from './figure-13.svg';
import figure14 from './figure-14.svg';
import figure15 from './figure-15.svg';
import figure16 from './figure-16.svg';
import figure17 from './figure-17.svg';
import figure18 from './figure-18.svg';
import figure19 from './figure-19.svg';
import figure20 from './figure-20.svg';
import figure21 from './figure-21.svg';
import figure22 from './figure-22.svg';
import figure23 from './figure-23.svg';

import image02 from './image-02.JPG';
import image05 from './image-05.JPG';
import image09 from './image-09.JPG';
import image11 from './image-11.JPG';

const descriptions = [
    null,
    { name: '校医院', desc: '生病、受伤时前往。记得准备好病历本、医保卡、身份证以及零钱。靠近北门' },
    { name: '月牙楼', desc: '有个昵称“蟹堡王”，内有校史馆、创想驿站等，平日经常有展览。' },
    { name: '基础图书馆', desc: '一直开到半夜12点的自习看书好去处！内有麦斯威咖啡厅。' },
    { name: '西教学区', desc: '西区教学楼，墙面砖红，与东教学楼隔河相望。通识课大多在这边。' },
    { name: '东教学区', desc: '东区教学楼，整体以白色为基调，开学要在此领取教科书，临湖报告厅位于东一东二之间。大一的基础课基本都会在这边上哦！' },
    { name: '网球场', desc: '因为免费所以难抢的打网球好去处！网球课也会在这里进行。' },
    { name: '东操+西操', desc: '平日跑步打卡的最火地点，平日22:30关灯。军训、运动会等校园大型活动也会在这里举行。' },
    { name: '医学院', desc: '不光是医学僧上课的学院，还有医学院附楼报告厅、人体博物馆，都是常去的打卡点。 ' },
    { name: '安中大楼', desc: '即建筑工程学院，位于机房旁边，内有建工之家咖啡屋。拍照好去处。' },
    { name: '机房', desc: '供计算机类课程上课、考试及其他需上机的考试之用。校园卡刷卡进入。' },
    { name: '农生环', desc: '农业生命环境学部聚集了紫金港最热爱自然的一批人。据说在农生环顶楼看过星星的情侣永远不会分手哦~' },
    { name: '白沙', desc: '高年级的理试专业的宿舍区，欢迎未来的有缘人呐！' },
    { name: '小白车', desc: '穿梭于校园内的代步工具。平日会往返于教学区于宿舍区间。' },
    { name: '紫云碧峰', desc: '农工、应生、设计专业的住宿区，运动、吃饭都超方便，总有一个你喜欢~' },
    { name: '大食堂', desc: '各色食堂，口味俱佳。' },
    { name: '文化广场', desc: '位于食堂一侧，社团纳新、各类活动在此宣传' },
    { name: '蓝田', desc: '最大的宿舍区！住宿条件没话说，欢迎竺院、工科还有医药专业的同学们~' },
    { name: '蒙民伟楼', desc: '以举行会议、学术报告为主要功能，一般在此参加会议或讲座' },
    { name: '丹阳青溪+翠柏', desc: '丹阳青溪：人文、社科、理科聚居地，享受放眼皆高颜值的快乐生活嗷！翠柏：医学生们的聚居地，很多研究生也住于此区~' },
    { name: '阳明桥', desc: '以明代哲学家王阳明命名的桥，前往东教、体育馆的必经之路，也是拍照、看划船圣地。' },
    { name: '紫云篮球场', desc: '紧邻云峰学园的篮球场，无数男生挥洒汗水的地方，帅气的运球可被高层的女生一览无余。也是举办趣味运动会、求是新晚的重要场地。' },
    { name: '体育馆', desc: '东大门前的大型运动场，一旁还有风雨操场。既有开学典礼、篮球赛，又有体育辅导课。' },
    { name: '小剧场 ', desc: '位于月牙楼斜对面，是各大学生组织、各类文体活动的聚集地，每周还有电影放映。' },
];

const icons = [
    null,
    figure01,
    figure02,
    figure03,
    figure04,
    figure05,
    figure06,
    figure07,
    figure08,
    figure09,
    figure10,
    figure11,
    figure12,
    figure13,
    figure14,
    figure15,
    figure16,
    figure17,
    figure18,
    figure19,
    figure20,
    figure21,
    figure22,
    figure23,
];

const images = [
    null, // 00
    null,
    image02,
    null,
    null,
    image05,
    null,
    null,
    null,
    image09,
    null,
    image11,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null, // 20
    null,
    null,
    null,
];

const positions = [
    { x: 635, y: 534, name: 23 },
    { x: 545, y: 308, name: 22 },
    { x: 419, y: 690, name: 21 },
    { x: 565, y: 403, name: 20 },
    { x: 225, y: 501, name: 19 },
    { x: 786, y: 265, name: 18 },
    { x: 219, y: 691, name: 17 },
    { x: 279, y: 523, name: 16 },
    { x: 286, y: 629, name: 15 },
    { x: 291, y: 849, name: 14 },
    { x: 389, y: 474, name: 13 },
    { x: 291, y: 428, name: 12 },
    { x: 1191, y: 501, name: 11 },
    { x: 679, y: 724, name: 10 },
    { x: 850, y: 718, name: 9 },
    { x: 1147, y: 670, name: 8 },
    { x: 532, y: 674, name: 7 },
    { x: 468, y: 729, name: 6 },
    { x: 867, y: 326, name: 5 },
    { x: 843, y: 547, name: 4 },
    { x: 624, y: 345, name: 3 },
    { x: 508, y: 451, name: 2 },
    { x: 219, y: 274, name: 1 },
];

const widths = [
    0,
    50.89,
    71.72,
    50.99,
    49.96,
    69.81,
    35.63,
    53.76,
    47.68,
    59.31,
    42.56,
    64.58,
    35.97,
    62.98,
    31.86,
    53.1,
    39.99,
    47.69,
    54.84,
    40.49,
    41.35,
    27.14,
    44.7,
    41.46,
];

const figures = positions.map(({ name, ...position }) => ({
    key: name,
    ...descriptions[name],
    icon: icons[name],
    image: images[name],
    ...position,
    width: widths[name],
}));

export default figures;
