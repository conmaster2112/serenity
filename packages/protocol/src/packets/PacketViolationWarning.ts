import { VarString, ZigZag } from '@serenityjs/binarystream';
import { Packet, Serialize } from '@serenityjs/raknet-protocol';
import { DataPacket } from '../DataPacket';
import { Packet as PacketId, ViolationSeverity, ViolationType } from '../enums';

@Packet(PacketId.PacketViolationWarning)
class PacketViolationWarning extends DataPacket {
	@Serialize(ZigZag) public type!: ViolationType;
	@Serialize(ZigZag) public severity!: ViolationSeverity;
	@Serialize(ZigZag) public packetId!: PacketId;
	@Serialize(VarString) public context!: string;
}

export { PacketViolationWarning };
