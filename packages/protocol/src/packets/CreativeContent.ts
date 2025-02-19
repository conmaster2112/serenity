import { Packet, Serialize } from '@serenityjs/raknet-protocol';
import { DataPacket } from '../DataPacket';
import { Packet as PacketId } from '../enums';
import type { CreativeItem } from '../types';
import { CreativeItems } from '../types';

@Packet(PacketId.CreativeContent)
class CreativeContent extends DataPacket {
	@Serialize(CreativeItems) public items!: CreativeItem[];
}

export { CreativeContent };
