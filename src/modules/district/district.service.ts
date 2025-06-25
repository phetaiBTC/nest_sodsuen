import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictService {
    constructor(
        @InjectRepository(District)
        private readonly districtRepository: Repository<District>
    ) { }
    getOneById(provinceId: number) {

        return this.districtRepository.find({ where: { province: { id: provinceId } } });

    }
    getAll() {
        return this.districtRepository.find();
    }

    async createDistrict() {
        const district = [
            {
                "id": 101,
                "name": "ຈັນທະບູລີ",
                "name_en": "Chanthabuly"
            },
            {
                "id": 102,
                "name": "ສີໂຄດຕະບອງ",
                "name_en": "Sikhottabong"
            },
            {
                "id": 103,
                "name": "ໄຊເສດຖາ",
                "name_en": "Xaysetha"
            },
            {
                "id": 104,
                "name": "ສີສັດຕະນາກ",
                "name_en": "Sisattanak"
            },
            {
                "id": 105,
                "name": "ນາຊາຍທອງ",
                "name_en": "Naxaithong"
            },
            {
                "id": 106,
                "name": "ໄຊທານີ",
                "name_en": "Xaythany"
            },
            {
                "id": 107,
                "name": "ຫາດຊາຍຟອງ",
                "name_en": "Hadxaifong"
            },
            {
                "id": 108,
                "name": "ສັງທອງ",
                "name_en": "Sangthong"
            },
            {
                "id": 109,
                "name": "ປາກງື່ມ",
                "name_en": "Parkngum"
            },
            {
                "id": 201,
                "name": "ຜົ້ງສາລີ",
                "name_en": "Phongsaly"
            },
            {
                "id": 202,
                "name": "ໃຫມ່",
                "name_en": "May"
            },
            {
                "id": 203,
                "name": "ຂວາ",
                "name_en": "Khua"
            },
            {
                "id": 204,
                "name": "ສຳພັນ",
                "name_en": "Samphanh"
            },
            {
                "id": 205,
                "name": "ບູນເຫນືອ",
                "name_en": "Bounneua"
            },
            {
                "id": 206,
                "name": "ຍອດອູ",
                "name_en": "Nhot ou"
            },
            {
                "id": 207,
                "name": "ບູນໃຕ້",
                "name_en": "Boontai"
            },
            {
                "id": 301,
                "name": "ຫລວງນ້ຳທາ",
                "name_en": "Luangnamtha"
            },
            {
                "id": 302,
                "name": "ສິງ",
                "name_en": "Sing"
            },
            {
                "id": 303,
                "name": "ລອງ",
                "name_en": "Long"
            },
            {
                "id": 304,
                "name": "ວຽງພູຄາ",
                "name_en": "Viengphoukha"
            },
            {
                "id": 305,
                "name": "ນາແລ",
                "name_en": "Nalae"
            },
            {
                "id": 401,
                "name": "ໄຊ",
                "name_en": "Xay"
            },
            {
                "id": 402,
                "name": "ຫລາ",
                "name_en": "La"
            },
            {
                "id": 403,
                "name": "ນາໝໍ້ ",
                "name_en": "Namor"
            },
            {
                "id": 404,
                "name": "ງາ",
                "name_en": "Nga"
            },
            {
                "id": 405,
                "name": "ແບງ",
                "name_en": "Beng"
            },
            {
                "id": 406,
                "name": "ຮຸນ",
                "name_en": "Hoon"
            },
            {
                "id": 407,
                "name": "ປາກແບງ",
                "name_en": "Pakbeng"
            },
            {
                "id": 501,
                "name": "ຫ້ວຍຊາຍ",
                "name_en": "Houixay"
            },
            {
                "id": 502,
                "name": "ຕົ້ນເຜິ້ງ",
                "name_en": "Tongpheung"
            },
            {
                "id": 503,
                "name": "ເມິງ",
                "name_en": "Meung"
            },
            {
                "id": 504,
                "name": "ຜາອຸດົມ",
                "name_en": "Phaoudom"
            },
            {
                "id": 505,
                "name": "ປາກທາ",
                "name_en": "Paktha"
            },
            {
                "id": 601,
                "name": "ຫຼວງພະບາງ",
                "name_en": "Luangprabang"
            },
            {
                "id": 602,
                "name": "ຊຽງເງິນ",
                "name_en": "Xiengngeun"
            },
            {
                "id": 603,
                "name": "ນານ",
                "name_en": "Nan"
            },
            {
                "id": 604,
                "name": "ປາກອູ",
                "name_en": "Parkou"
            },
            {
                "id": 605,
                "name": "ນ້ຳບາກ",
                "name_en": "Nambak"
            },
            {
                "id": 606,
                "name": "ງອຍ",
                "name_en": "Ngoi"
            },
            {
                "id": 607,
                "name": "ປາກແຊງ",
                "name_en": "Pakxeng"
            },
            {
                "id": 608,
                "name": "ໂພນໄຊ",
                "name_en": "Phonxay"
            },
            {
                "id": 609,
                "name": "ຈອມເພັດ",
                "name_en": "Chomphet"
            },
            {
                "id": 610,
                "name": "ວຽງຄຳ",
                "name_en": "Viengkham"
            },
            {
                "id": 611,
                "name": "ພູຄູນ",
                "name_en": "Phoukhoune"
            },
            {
                "id": 612,
                "name": "ໂພນທອງ",
                "name_en": "Phonthong"
            },
            {
                "id": 701,
                "name": "ຊຳເໜືອ",
                "name_en": "Xamneua"
            },
            {
                "id": 702,
                "name": "ຊຽງຄໍ້",
                "name_en": "Xiengkhor"
            },
            {
                "id": 703,
                "name": "ຮ້ຽມ",
                "name_en": "Hiam"
            },
            {
                "id": 704,
                "name": "ວຽງໄຊ",
                "name_en": "Viengxay"
            },
            {
                "id": 705,
                "name": "ຫົວເມືອງ",
                "name_en": "Huameuang"
            },
            {
                "id": 706,
                "name": "ຊຳໃຕ້",
                "name_en": "Xamtay"
            },
            {
                "id": 707,
                "name": "ສົບເບົາ",
                "name_en": "Sopbao"
            },
            {
                "id": 708,
                "name": "ແອດ",
                "name_en": "Add"
            },
            {
                "id": 709,
                "name": "ກວັນ",
                "name_en": "Kuan"
            },
            {
                "id": 710,
                "name": "ຊອນ",
                "name_en": "Xone"
            },
            {
                "id": 801,
                "name": "ໄຊຍະບູລີ",
                "name_en": "Xayabury"
            },
            {
                "id": 802,
                "name": "ຄອບ",
                "name_en": "Khop"
            },
            {
                "id": 803,
                "name": "ຫົງສາ",
                "name_en": "Hongsa"
            },
            {
                "id": 804,
                "name": "ເງິນ",
                "name_en": "Ngeun"
            },
            {
                "id": 805,
                "name": "ຊຽງຮ່ອນ",
                "name_en": "Xienghone"
            },
            {
                "id": 806,
                "name": "ພຽງ",
                "name_en": "Phieng"
            },
            {
                "id": 807,
                "name": "ປາກລາຍ",
                "name_en": "Parklai"
            },
            {
                "id": 808,
                "name": "ແກ່ນທ້າວ",
                "name_en": "Kenethao"
            },
            {
                "id": 809,
                "name": "ບໍ່ແຕນ",
                "name_en": "Botene"
            },
            {
                "id": 810,
                "name": "ທົ່ງມີໄຊ",
                "name_en": "Thongmyxay"
            },
            {
                "id": 811,
                "name": "ໄຊຊະຖານ",
                "name_en": "Xaysathan"
            },
            {
                "id": 901,
                "name": "ແປກ",
                "name_en": "Pek"
            },
            {
                "id": 902,
                "name": "ຄຳ",
                "name_en": "Kham"
            },
            {
                "id": 903,
                "name": "ໜອງແຮດ",
                "name_en": "Nonghed"
            },
            {
                "id": 904,
                "name": "ຄູນ",
                "name_en": "Khoune"
            },
            {
                "id": 905,
                "name": "ໝອກ",
                "name_en": "Mork"
            },
            {
                "id": 906,
                "name": "ພູກູດ",
                "name_en": "Phookood"
            },
            {
                "id": 907,
                "name": "ຜາໄຊ",
                "name_en": "Phaxay"
            },
            {
                "id": 1001,
                "name": "ໂພນໂຮງ",
                "name_en": "Phonhong"
            },
            {
                "id": 1002,
                "name": "ທຸລະຄົມ",
                "name_en": "Thoulakhom"
            },
            {
                "id": 1003,
                "name": "ແກ້ວອຸດົມ",
                "name_en": "Keooudom"
            },
            {
                "id": 1004,
                "name": "ກາສີ",
                "name_en": "Kasy"
            },
            {
                "id": 1005,
                "name": "ວັງວຽງ",
                "name_en": "Vangvieng"
            },
            {
                "id": 1006,
                "name": "ເຟືອງ",
                "name_en": "Feuang"
            },
            {
                "id": 1007,
                "name": "ຊະນະຄາມ",
                "name_en": "Xanakham"
            },
            {
                "id": 1008,
                "name": "ແມດ",
                "name_en": "Mad"
            },
            {
                "id": 1009,
                "name": "ວຽງຄຳ",
                "name_en": "Viengkham"
            },
            {
                "id": 1010,
                "name": "ຫີນເຫີບ",
                "name_en": "Hinherb"
            },
            {
                "id": 1012,
                "name": "ໝື່ນ",
                "name_en": "Meun"
            },
            {
                "id": 1101,
                "name": "ປາກຊັນ",
                "name_en": "Pakxane"
            },
            {
                "id": 1102,
                "name": "ທ່າພະບາດ",
                "name_en": "Thaphabath"
            },
            {
                "id": 1103,
                "name": "ປາກກະດິງ",
                "name_en": "Pakkading"
            },
            {
                "id": 1104,
                "name": "ບໍລິຄັນ",
                "name_en": "Bolikhanh"
            },
            {
                "id": 1105,
                "name": "ຄຳເກີດ",
                "name_en": "Khamkheuth"
            },
            {
                "id": 1106,
                "name": "ວຽງທອງ",
                "name_en": "Viengthong"
            },
            {
                "id": 1107,
                "name": "ໄຊຈຳພອນ",
                "name_en": "Xaychamphone"
            },
            {
                "id": 1201,
                "name": "ທ່າແຂກ",
                "name_en": "Thakhek"
            },
            {
                "id": 1202,
                "name": "ມະຫາໄຊ",
                "name_en": "Mahaxay"
            },
            {
                "id": 1203,
                "name": "ໜອງບົກ",
                "name_en": "Nongbok"
            },
            {
                "id": 1204,
                "name": "ຫີນບູນ",
                "name_en": "Hinboon"
            },
            {
                "id": 1205,
                "name": "ຍົມມະລາດ",
                "name_en": "Nhommalath"
            },
            {
                "id": 1206,
                "name": "ບົວລະພາ",
                "name_en": "Bualapha"
            },
            {
                "id": 1207,
                "name": "ນາກາຍ",
                "name_en": "Nakai"
            },
            {
                "id": 1208,
                "name": "ເຊບັ້ງໄຟ",
                "name_en": "Xebangfay"
            },
            {
                "id": 1209,
                "name": "ໄຊບົວທອງ",
                "name_en": "Xaybuathong"
            },
            {
                "id": 1210,
                "name": "ຄູນຄຳ",
                "name_en": "Khounkham"
            },
            {
                "id": 1301,
                "name": "ໄກສອນ ພົມວິຫານ",
                "name_en": "Kaisone Phomvihane"
            },
            {
                "id": 1302,
                "name": "ອຸທຸມພອນ",
                "name_en": "Outhoumphone"
            },
            {
                "id": 1303,
                "name": "ອາດສະພັງທອງ",
                "name_en": "Atsaphangthong"
            },
            {
                "id": 1304,
                "name": "ພີນ",
                "name_en": "Phine"
            },
            {
                "id": 1305,
                "name": "ເຊໂປນ",
                "name_en": "Xepon"
            },
            {
                "id": 1306,
                "name": "ນອງ",
                "name_en": "Nong"
            },
            {
                "id": 1307,
                "name": "ທ່າປາງທອງ",
                "name_en": "Thapangthong"
            },
            {
                "id": 1308,
                "name": "ສອງຄອນ",
                "name_en": "Songkhone"
            },
            {
                "id": 1309,
                "name": "ຈຳພອນ",
                "name_en": "Champhone"
            },
            {
                "id": 1310,
                "name": "ຊົນບູລີ",
                "name_en": "Xonbuly"
            },
            {
                "id": 1311,
                "name": "ໄຊບູລີ",
                "name_en": "Xaybouly"
            },
            {
                "id": 1312,
                "name": "ວິລະບູລີ",
                "name_en": "Vilabuly"
            },
            {
                "id": 1313,
                "name": "ອາດສະພອນ",
                "name_en": "Atsaphone"
            },
            {
                "id": 1314,
                "name": "ໄຊພູທອງ",
                "name_en": "Xayphoothong"
            },
            {
                "id": 1315,
                "name": "ພະລານໄຊ",
                "name_en": "Phalanxay"
            },
            {
                "id": 1401,
                "name": "ສາລະວັນ",
                "name_en": "Saravane"
            },
            {
                "id": 1402,
                "name": "ຕາໂອ້ຍ",
                "name_en": "Ta oi"
            },
            {
                "id": 1403,
                "name": "ຕຸ້ມລານ",
                "name_en": "Toomlam"
            },
            {
                "id": 1404,
                "name": "ລະຄອນເພັງ",
                "name_en": "Lakhonepheng"
            },
            {
                "id": 1405,
                "name": "ວາປີ",
                "name_en": "Vapy"
            },
            {
                "id": 1406,
                "name": "ຄົງເຊໂດນ",
                "name_en": "Kongxedone"
            },
            {
                "id": 1407,
                "name": "ເລົ່າງາມ",
                "name_en": "Lao ngarm"
            },
            {
                "id": 1408,
                "name": "ສະມ້ວຍ",
                "name_en": "Samoi"
            },
            {
                "id": 1501,
                "name": "ລະມາມ",
                "name_en": "Lamarm"
            },
            {
                "id": 1502,
                "name": "ກະລືມ",
                "name_en": "Kaleum"
            },
            {
                "id": 1503,
                "name": "ດາກຈຶງ",
                "name_en": "Dakcheung"
            },
            {
                "id": 1504,
                "name": "ທ່າແຕງ",
                "name_en": "Thateng"
            },
            {
                "id": 1601,
                "name": "ປາກເຊ",
                "name_en": "Pakse"
            },
            {
                "id": 1602,
                "name": "ຊະນະສົມບູນ",
                "name_en": "Sanasomboon"
            },
            {
                "id": 1603,
                "name": "ບາຈຽງຈະເລີນສຸກ",
                "name_en": "Bachiangchaleunsook"
            },
            {
                "id": 1604,
                "name": "ປາກຊ່ອງ",
                "name_en": "Pakxong"
            },
            {
                "id": 1605,
                "name": "ປະທຸມພອນ",
                "name_en": "Pathoumphone"
            },
            {
                "id": 1606,
                "name": "ໂພນທອງ",
                "name_en": "Phonthong"
            },
            {
                "id": 1607,
                "name": "ຈຳປາສັກ",
                "name_en": "Champasak"
            },
            {
                "id": 1608,
                "name": "ສຸຂຸມາ",
                "name_en": "Sukhuma"
            },
            {
                "id": 1609,
                "name": "ມຸນລະປະໂມກ",
                "name_en": "Moonlapamok"
            },
            {
                "id": 1610,
                "name": "ໂຂງ",
                "name_en": "Khong"
            },
            {
                "id": 1701,
                "name": "ໄຊເສດຖາ",
                "name_en": "Xaysettha"
            },
            {
                "id": 1702,
                "name": "ສາມະຄີໄຊ",
                "name_en": "Samakkixay"
            },
            {
                "id": 1703,
                "name": "ສະໜາມໄຊ",
                "name_en": "Sanamxay"
            },
            {
                "id": 1704,
                "name": "ສານໄຊ",
                "name_en": "Sanxay"
            },
            {
                "id": 1705,
                "name": "ພູວົງ",
                "name_en": "Phouvong"
            },
            {
                "id": 1801,
                "name": "ອານຸວົງ",
                "name_en": "Anouvong"
            },
            {
                "id": 1802,
                "name": "ທ່າໂທມ",
                "name_en": "Thathom"
            },
            {
                "id": 1803,
                "name": "ລ້ອງແຈ້ງ",
                "name_en": "Longcheng"
            },
            {
                "id": 1804,
                "name": "ຮົ່ມ",
                "name_en": "Hom"
            },
            {
                "id": 1805,
                "name": "ລ້ອງຊານ",
                "name_en": "Longsan"
            }
        ]
        for(let i = 0; i < district.length; i++) {
            const ceateDistrict = this.districtRepository.create(district[i]);
            await this.districtRepository.save(ceateDistrict);
        }
        return "success";
    }
}
