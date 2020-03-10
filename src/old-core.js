/**
 * USELESS FILE JUST FOR VIEW SOMETHING
 * USELESS FILE JUST FOR VIEW SOMETHING
 * USELESS FILE JUST FOR VIEW SOMETHING
 * USELESS FILE JUST FOR VIEW SOMETHING
 * USELESS FILE JUST FOR VIEW SOMETHING
 * USELESS FILE JUST FOR VIEW SOMETHING
 * USELESS FILE JUST FOR VIEW SOMETHING
 */





const RSA = require('crypto');
const net = require('net');
const ByteArray = require('bytearray-node');
const BooleanByteWrapper = require('./IO/BooleanByteWrapper');
const NodeRSA = require('node-rsa');
const CustomDataWrapper = require('./IO/CustomDataWrapper');
const crypto = require('crypto');
// https://nodejs.org/api/net.html#net_new_net_server_options_connectionlistener

tes = new CustomDataWrapper("de")
console.log(tes.position)

//<entry key="connection.host">34.252.21.81,52.17.231.202,63.34.214.78</entry>
const option = {
    host: '63.34.214.78',
    port: 5555
};


const client = net.createConnection(option, function () {
    console.log('On est connecté au serveur d\'authentification');
});
client.setTimeout(5000);

// Jeu d'essai pour decrypter un paquet id 4
// header :


//const hexStreamDidentificationMessage = "00120000003d0114010236030000013f0000026672800243aeae47364f4095d9d82a5d6bfa7d3e4f35ea55c90f5e318c52d38910e6fc957da00edab295272d685adbdcc1194b0327d61ea7c0a4cd4746cde30393989d7cfcceb1b6cbfc37eb5b0b698d9c68fe9f56e08341aa2ceabb2489ee131844b123e9b1f2defd2683ac3e71d28615b5a02bfa9e8d339501a1973d75af3c6ffb55c9f36d22894cbba7edbd285991e1b0251876b223d4019a392134855316f896d4188704d51062b4da38d360ea74bbcc6d58da27be67feab29e2677e4d1b59789e4c13f7718ee8636167a04d33023d5180deeeba6354ffbd9d5d446d6c0422c98a23f87722b09089d44f304229276363542be02bd2efbfbd5dddad80d0c9ae7b07550000000000";
/*const identificationMessageBuffer = new ByteArray(Buffer.from(hexStreamDidentificationMessage.match(/.{2}/g).map(x => parseInt(x, 16))));
treatPacket(4, identificationMessageBuffer);
*/

// Quand le serveur envoi des données
client.on('data', function (data) {
    console.log(data)
    const buffer = new ByteArray(Buffer.from(data));
    parseData(buffer);
});

function parseData(input) {

    let bufferLength = input.buffer.length;

    while (bufferLength) {
        const header = input.readShort();

        const packetId = header >> 2;
        const lenType = header & 0b11;

        let length = 0;
        let i = lenType;

        while (i--)
            length = (length << 0b1000) + input.readByte();


        const data = new ByteArray(input.buffer.slice(2 + lenType, 2 + lenType + length));

        console.log("==========================================" +
            "\npaquetId : " + packetId + "\nlenType : " + lenType + " \ntaille : " + length + "\nDonnées : " + data.buffer.toString("hex")
            + "\n paquet complet (avec header) : " + input.buffer.toString("hex"));
        console.log("==========================================\n");

        treatPacket(packetId, data);

        input.buffer = input.buffer.slice(length + lenType + 2, bufferLength);
        input.position = 0;
        bufferLength -= length + lenType + 2;
    }

}

function treatPacket(packetId, input) {
    switch (packetId) {
        case 1:
            console.log("RequiredProtocol");
            const requiredVersion = input.readInt();
            const currentVersion = input.readInt();
            console.log("\trequiredVersion = " + requiredVersion + "\n\tcurrentVersion = " + currentVersion);
            break;
        case 3:
            console.log("HelloConnectMessage");
            const salt = input.readUTF();
            const key = [];
            const _keyLen = readVarInt(input);
            for (let i = 0; i < _keyLen; i++) {
                key.push(input.readByte());
            }
            console.log("\tsalt = " + salt + "\n\tkey = ");
            console.log("longueur du salt = " + salt.length);
            console.log("longueur des keys = " + key.length)
            // On vnoit le paquet 4 : IdentificationMessage
            const output = new ByteArray();



            let _box0 = 0;
            _box0 = BooleanByteWrapper.setFlag(_box0, 0, 1); // autoConnect : boléen
            _box0 = BooleanByteWrapper.setFlag(_box0, 1, 0); // useCertificate : boléen
            _box0 = BooleanByteWrapper.setFlag(_box0, 2, 0); // useLoginToken : boléen

            setPublicKey(key);
            output.writeByte(_box0); // autoConnect, useCertificate,useLogintoken

            output.writeByte(2); // major

            output.writeByte(54); // minor

            output.writeByte(3); // code

            output.writeInt(319); // build

            output.writeByte(0); // buildType

            output.writeUTF("fr"); // lang
            //let pkey = 'MIIBUzANBgkqhkiG9w0BAQEFAAOCAUAAMIIBOwKCATIAgucoka9J2PXcNdjcu6CuDmgteIMB+rih2UZJIuSoNT/0J/lEKL/W4UYbDA4U/6TDS0dkMhOpDsSCIDpO1gPG6+6JfhADRfIJItyHZflyXNUjWOBG4zuxc/L6wldgX24jKo+iCvlDTNUedE553lrfSU23Hwwzt3+doEfgkgAf0l4ZBez5Z/ldp9it2NH6/2/7spHm0Hsvt/YPrJ+EK8ly5fdLk9cvB4QIQel9SQ3JE8UQrxOAx2wrivc6P0gXp5Q6bHQoad1aUp81Ox77l5e8KBJXHzYhdeXaM91wnHTZNhuWmFS3snUHRCBpjDBCkZZ+CxPnKMtm2qJIi57RslALQVTykEZoAETKWpLBlSm92X/eXY2DdGf+a7vju9EigYbX0aXxQy2Ln2ZBWmUJyZE8B58CAwEAAQ==';
            let pkey = '-----BEGIN PUBLIC KEY-----\n' +
                'MIIBUzANBgkqhkiG9w0BAQEFAAOCAUAAMIIBOwKCATIAgucoka9J2PXcNdjcu6CuDmgteIMB+rih\n' +
                '2UZJIuSoNT/0J/lEKL/W4UYbDA4U/6TDS0dkMhOpDsSCIDpO1gPG6+6JfhADRfIJItyHZflyXNUj\n' +
                'WOBG4zuxc/L6wldgX24jKo+iCvlDTNUedE553lrfSU23Hwwzt3+doEfgkgAf0l4ZBez5Z/ldp9it\n' +
                '2NH6/2/7spHm0Hsvt/YPrJ+EK8ly5fdLk9cvB4QIQel9SQ3JE8UQrxOAx2wrivc6P0gXp5Q6bHQo\n' +
                'ad1aUp81Ox77l5e8KBJXHzYhdeXaM91wnHTZNhuWmFS3snUHRCBpjDBCkZZ+CxPnKMtm2qJIi57R\n' +
                'slALQVTykEZoAETKWpLBlSm92X/eXY2DdGf+a7vju9EigYbX0aXxQy2Ln2ZBWmUJyZE8B58CAwEA\n' +
                'AQ==\n' +
                '-----END PUBLIC KEY-----';
            let credentials = cipherRsa("NDCdistinctif","motdepasseclair17",null,salt,generateRandomAESKey(), pkey);
            console.log("test 42")
            writeVarInt(output, credentials.length); // credentialsLength
            console.log("test 43")
            for (let _i3 = 0; _i3 < credentials.length; _i3++) {
                output.writeByte(credentials[_i3]);
            }


            output.writeShort(0); // serverId
            output.writeByte(0);

            let failedAttempts = []
            output.writeShort(failedAttempts.length);
            for(let _i9 = 0; _i9 < failedAttempts.length; _i9++)
            {
                if(failedAttempts[_i9] < 0)
                {
                    throw new Error("Forbidden value (" + failedAttempts[_i9] + ") on element 9 (starting at 1) of failedAttempts.");
                }

                writeVarShort(output, thifailedAttempts[_i9])
            }

            console.log(" taille :  " + output.length)
            writePacket(new ByteArray(), 4, output, 61);


            break;
        // Experimental pour lire
        case 4:
            console.log("IdentificationMessage");
            console.log("\ninstanceId = " + input.readUnsignedInt());
            console.log("\nlongueur = " + input.readShort());

            const box3 = input.readByte();
            console.log("\nautoconnect = " + BooleanByteWrapper.getFlag(box3, 0));
            console.log("\nuseCerfificate = " + BooleanByteWrapper.getFlag(box3, 1));
            console.log("\nuseLoginToken = " + BooleanByteWrapper.getFlag(box3, 2));

            console.log("\nmajor = " + input.readByte());
            console.log("\nminor = " + input.readByte());
            console.log("\ncode = " + input.readByte());
            console.log("\nbuild = " + input.readInt());
            console.log("\nbuildType = " + input.readByte());
            console.log("\nlang = " + input.readUTF());
            const credentialsLength = readVarInt(input);
            const credientials = [];
            console.log("\ncredentials length = " + credentialsLength); // varInt
            for (let i = 0; i < credentialsLength; i++) {
                credientials.push(input.readUnsignedByte());
            }
            console.log("\nserverId = ", input.readShort());
            console.log("\nsessionOptionalSaltFunc = ", readInt64(input).toNumber());

            const failedAttemptsLen = input.readShort();
           // const failedAttempts = [];
            console.log("\n_failedAttemptsLen = ", failedAttemptsLen);
            for (let i = 0; i < failedAttemptsLen; i++) {
                let temp = readVarShort(input);
                if (temp < 0) {
                    throw new Error("Forbidden value (" + temp + ") on elements of failedAttempts.");
                }
                failedAttempts.push(temp);
            }


            break;

        case 20:
            console.log("IdentificationFailedMessage");
            const reason = input.readByte();
            console.log("\treason = " + reason);
            break;
    }
}

function setPublicKey(key){

}

function readVarShort(input) {
    let b = 0;
    let value = 0;
    let offset = 0;
    for (let hasNext = false; offset < 16;) {
        b = input.readByte();
        hasNext = (b & 128) === 128;
        if (offset > 0) {
            value = value + ((b & 127) << offset);
        } else {
            value = value + (b & 127);
        }
        offset = offset + 7;
        if (!hasNext) {
            if (value > 32767) {
                value = value - 65536;
            }
            return value;
        }
    }
    throw new Error("Too much data");
}

function readInt64(input) {
    let b = 0;
    let result = {
        low: 0,
        high: 0,
        toNumber: () => {
            return result.high * 4294967296.0 + result.low
        }
    }
    let i = 0;
    while (true) {
        b = input.readUnsignedByte();
        if (i === 28) {
            break;
        }
        if (b >= 128) {
            result.low = result.low | (b & 127) << i;
            i = i + 7;
            continue;
        }
        result.low = result.low | b << i;
        return result;
    }
    if (b >= 128) {
        b = b & 127;
        result.low = result.low | b << i;
        result.high = b >>> 4;
        i = 3;
        while (true) {
            b = input.readUnsignedByte();
            if (i < 32) {
                if (b >= 128) {
                    result.high = result.high | (b & 127) << i;
                } else {
                    break;
                }
            }
            i = i + 7;
        }
        result.high = result.high | b << i;
        return result;
    }
    result.low = result.low | b << i;
    result.high = b >>> 4;
    return result;
}


function readVarInt(input) {
    let b = 0;
    let value = 0;
    let offset = 0;
    for (let hasNext = false; offset < 32;) {
        b = input.readByte();
        hasNext = (b & 128) == 128;
        if (offset > 0) {
            value = value + ((b & 127) << offset);
        } else {
            value = value + (b & 127);
        }
        offset = offset + 7;
        if (!hasNext) {
            return value;
        }
    }
    throw new Error("Too much data");
}

function getFlag(byte, position) {
    if (position > 7) throw Error('Bytebox Overflow');
    return !!(byte >> position);

}

function setFlag(a, pos, b) {
    switch (pos) {
        case 0:
            if (b) {
                a = a | 1;
            } else {
                a = a & 255 - 1;
            }
            break;
        case 1:
            if (b) {
                a = a | 2;
            } else {
                a = a & 255 - 2;
            }
            break;
        case 2:
            if (b) {
                a = a | 4;
            } else {
                a = a & 255 - 4;
            }
            break;
        case 3:
            if (b) {
                a = a | 8;
            } else {
                a = a & 255 - 8;
            }
            break;
        case 4:
            if (b) {
                a = a | 16;
            } else {
                a = a & 255 - 16;
            }
            break;
        case 5:
            if (b) {
                a = a | 32;
            } else {
                a = a & 255 - 32;
            }
            break;
        case 6:
            if (b) {
                a = a | 64;
            } else {
                a = a & 255 - 64;
            }
            break;
        case 7:
            if (b) {
                a = a | 128;
            } else {
                a = a & 255 - 128;
            }
            break;
        default:
            throw new Error("Bytebox overflow.");
    }
    return a;
}

// When connection disconnected.
client.on('end', function () {
    console.log('Client socket disconnect. ');
});

client.on('timeout', function () {
    console.log('Client connection timeout. ');
});

client.on('error', function (err) {
    console.error(JSON.stringify(err));
});


//login : string
// pwd : string
// certificate : TrustCertificate

//cipher rsa  : Vector.<int>
function cipherRsa(login, pwd, certificate, salt, AESKey, publicKey) {
    // ByteArray
    let baOut = null;
    // ByteArray
    let debugOutput = null;
    let n = 0;
    // Bytearray
    let baIn = new ByteArray();
    baIn.writeUTFBytes(salt);
    baIn.writeBytes(AESKey);
    if (certificate) {
        baIn.writeUnsignedInt(certificate.id);
        baIn.writeUTFBytes(certificate.hash);
    }
    baIn.writeByte(login.length);
    baIn.writeUTFBytes(login);
    baIn.writeUTFBytes(pwd);
    /* try
     {
         if(File.applicationDirectory.resolvePath("debug-login.txt") || File.applicationDirectory.resolvePath("debuglogin.txt"))
         {
             _log.debug("login with certificate");
             debugOutput = new ByteArray();
             baIn.position = 0;
             debugOutput.position = 0;

             debugOutput = RSA.publicEncrypt((new PUBLIC_KEY_V2() as ByteArray).readUTFBytes((new PUBLIC_KEY_V2() as ByteArray).length),baIn);
         }
     }
     catch(e:Error)
     {
         _log.error("Erreur lors du log des informations de login " + e.getStackTrace());
     }*/

    console.log("ca plante ici ?")
    //let testC = new crypto.KeyObject('public',{data: publicKey, format: 'pem', type: 'pkcs1'} );
    baOut = new ByteArray(crypto.publicEncrypt(Buffer.from(publicKey), baIn.buffer));
    //:Vector.<int>
    console.log("on passe ici ?")
    let ret = [];
    baOut.position = 0;
    for (let i = 0; baOut.bytesAvailable !== 0;) {

        n = baOut.readByte();
        ret[i] = n;
        i++;
    }

    console.log("dit moi pas que ça passe ici depuis tt a lheure quand meme")
    return ret;
}

// bytearray
function generateRandomAESKey() {
    let ba = new ByteArray();
    for (let i = 0; i < 31; i++) {
        ba[i] = Math.floor(Math.random() * 256);
    }
    return ba;
}


function writeVarInt(output, value) {
    let b = 0;
    let ba = new ByteArray();
    if (value >= 0 && value <= 127) {
        ba.writeByte(value);
        output.writeBytes(ba);
        return;
    }
    let c = value;
    for (let buffer = new ByteArray(); c !== 0;) {
        buffer.writeByte(c & 127);
        buffer.position = buffer.length - 1;
        b = buffer.readByte();
        c = c >>> 7;
        if (c > 0) {
            b = b | 128;
        }
        console.log(b)
        ba.writeUnsignedByte(b);
    }
    output.writeBytes(ba);
}

function writeVarShort(output, value) {
    let b = 0;
    if (value > 32767 || value < -32768) {
        throw new Error("Forbidden value");
    }
    let ba = new ByteArray();
    if (value >= 0 && value <= 127) {
        ba.writeByte(value);
        output.writeBytes(ba);
        return;
    }
    let c = value & 65535;
    for (let buffer = new ByteArray(); c !== 0;) {
        buffer.writeByte(c & 127);
        buffer.position = buffer.length - 1;
        b = buffer.readByte();
        c = c >>> 7;
        if (c > 0) {
            b = b | 128;
        }
        ba.writeByte(b);
    }
    output.writeBytes(ba);
}

/*
function writeVarLong(output, value)
{
    let i = 0;
    let val = Int64.fromNumber(value);
    if(val.high == 0)
    {
        this.writeint32(this._data,val.low);
    }
    else
    {
        for(i = 0; i < 4; )
        {
            this._data.writeByte(val.low & 127 | 128);
            val.low = val.low >>> 7;
            i++;
        }
        if((val.high & 268435455 << 3) == 0)
        {
            this._data.writeByte(val.high << 4 | val.low);
        }
        else
        {
            this._data.writeByte((val.high << 4 | val.low) & 127 | 128);
            this.writeint32(this._data,val.high >>> 3);
        }
    }
}*/






function writePacket(output, id, data, instance_id)
{
    let high = 0;
    let low = 0;
    let typeLen = computeTypeLen(data.length);
    output.writeShort(subComputeStaticHeader(id,typeLen));
    output.writeUnsignedInt(instance_id);
    switch(typeLen)
    {
        case 0:
            return;
        case 1:
            output.writeByte(data.length);
            break;
        case 2:
            output.writeShort(data.length);
            break;
        case 3:
            high = data.length >> 16 & 255;
            low = data.length & 65535;
            output.writeByte(high);
            output.writeShort(low);
    }
    output.writeBytes(data,0,data.length);

    client.write(output.buffer);

}

function computeTypeLen(len)
{
    if(len > 65535)
    {
        return 3;
    }
    if(len > 255)
    {
        return 2;
    }
    if(len > 0)
    {
        return 1;
    }
    return 0;
}

function subComputeStaticHeader(msgId, typeLen)
{
    return msgId << 2 | typeLen;
}