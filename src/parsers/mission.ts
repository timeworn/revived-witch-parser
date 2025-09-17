import { BaseMission, RawAllMission } from "src/types/mission.model";
import { BaseParser } from "src/utils/BaseParser";
import { createRewardItems } from "src/utils/utils";
import cActiveMissionConfigJson from "src/data/mission/cactivemissionconfig.json";
import cActiveMissionModuleJson from "src/data/mission/cactivemissionmod.json";
import cBackMissionConfigJson from "src/data/mission/cbackmissionconfig.json";
import cBpDailyTaskConfigJson from "src/data/mission/cbpdailytaskconfig.json";
import cCharacterMissionConfigJson from "src/data/mission/ccharactermissionconfig.json";
import cChildrensDayMissionJson from "src/data/mission/cchildrensdaymission.json";
import cCoinMissionConfigJson from "src/data/mission/ccoinmissionconfig.json";
import cDailyGoldenMissionConfigJson from "src/data/mission/cdailygoldenmissionconfig.json";
import cDailyMissionConfigJson from "src/data/mission/cdailymissionconfig.json";
import cElevenMissionCfgJson from "src/data/mission/celevenmissioncfg.json";
import cFirstAnniversaryMissionJson from "src/data/mission/cfirstanniversarymission.json";
import cHalloweenMissionJson from "src/data/mission/challoweenmission.json";
import cJigsawMissionConfigJson from "src/data/mission/cjigsawmissionconfig.json";
import cLoginMissionJson from "src/data/mission/cloginmission.json";
import cMissionConfigJson from "src/data/mission/cmissionconfig.json";
import cWeekMissionConfigJson from "src/data/mission/cweekmissionconfig.json";

export class MissionParser extends BaseParser<RawAllMission, BaseMission> {
  static getRaws(): RawAllMission[] {
    return [
      ...Object.values(cMissionConfigJson.Data),
      ...Object.values(cActiveMissionConfigJson.Data),
      ...Object.values(cDailyMissionConfigJson.Data),
      ...Object.values(cWeekMissionConfigJson.Data),
      ...Object.values(cBpDailyTaskConfigJson.Data),
      ...Object.values(cActiveMissionModuleJson.Data),
      ...Object.values(cBackMissionConfigJson.Data),
      ...Object.values(cCharacterMissionConfigJson.Data),
      ...Object.values(cChildrensDayMissionJson.Data),
      ...Object.values(cCoinMissionConfigJson.Data),
      ...Object.values(cDailyGoldenMissionConfigJson.Data),
      ...Object.values(cElevenMissionCfgJson.Data),
      ...Object.values(cFirstAnniversaryMissionJson.Data),
      ...Object.values(cHalloweenMissionJson.Data),
      ...Object.values(cJigsawMissionConfigJson.Data),
      ...Object.values(cLoginMissionJson.Data),
    ];
  }

  static getRaw(id: number): RawAllMission | undefined {
    const raws = MissionParser.getRaws();
    return raws.find((raw) => raw.id === id);
  }

  transform(raw: RawAllMission): BaseMission {
    return {
      id: raw.id as number,
      name: this.localizer.localize(raw.missionnameTextID?),
      description: this.localizer.localize(raw.descriptionTextID?),
      shortDescription: this.localizer.localize(raw.short_descriptionTextID?),
      missionType: raw.missiontype as number, // not sure how to localize this cmissiontypeconfig.json
      rewards: createRewardItems(raw.rewarditem, raw.rewardquantity),
      // add more later
    };
  }
}
