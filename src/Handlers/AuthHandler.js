const Logger = require('../IO/Logger');
const Messages = require('../IO/dofus/Messages');
const Version = require('../IO/dofus/Types').Version;
const ByteArray = require('../IO/ByteArray');
const AESEnum = require('../Enums/AESEnum');

// TODO rename les arguments "client" par "server"
const handleProtocolRequiredMessage = (client, packet) => {
    Logger.debug("Required = " + packet.requiredVersion + " - Current = " + packet.currentVersion + "\r");
};

const handleHelloConnectMessage = (client, packet) => {
    Logger.debug("Salt = " + packet.salt + " - Key = " + packet.key + "\r");

    const key = packet.key;
    const salt = packet.salt;
    const AESKey = generateRandomAESKey();
    const loginValidationAction = client.loginValidationAction;
    Logger.debug(loginValidationAction.username + " et "  + loginValidationAction.password + " \r");

    client.send(new Messages.IdentificationMessage(
        new Version(2, 54, 16, 343, 0),
        'fr',
        cipherRsa(loginValidationAction.username,loginValidationAction.password,this._certificate),
        1,
        true,
        //this._certificate != null,
        false
    ));
};

const generateRandomAESKey = () => {
    const byteArray = new ByteArray();

    for (let i = 0; i < AESEnum.AES_KEY_LENGTH; i++) {
        byteArray[i] = Math.floor(Math.random() * 256);
    }

    return byteArray;
};

const cipherRsa = (login, pwd, certificate) => {
    let baOut = null; // ByteArray
    let debugOutput = null; // ByteArray
    let n = 0; // int
    let baIn = new ByteArray(); // ByteArray
    baIn.writeUTFBytes(this._salt);
    baIn.writeBytes(generateRandomAESKey());

    if (certificate) {
        baIn.writeUnsignedInt(certificate.id);
        baIn.writeUTFBytes(certificate.hash);
    }
    baIn.writeByte(login.length);
    baIn.writeUTFBytes(login);
    baIn.writeUTFBytes(pwd);
    /*try
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
    catch(e)
    {
        _log.error("Erreur lors du log des informations de login " + e.getStackTrace());
    }*/


    /*
    baOut = RSA.publicEncrypt(this._publicKey, baIn);
    var ret = new Vector. < int > (); // :Vector.<int>
    baOut.position = 0;
    for (var i: int = 0; baOut.bytesAvailable != 0;) {
        n = baOut.readByte();
        ret[i] = n;
        i++;
    }
    return ret;*/
};

const handleSystemMessageDisplayMessage = (client, packet) => {
    Logger.debug("hangUp = " + packet.hangUp + " - msgId = " + packet.msgId + " - parameters - " + packet.parameters + "\r");
};

module.exports = {
    handleProtocolRequiredMessage,
    handleHelloConnectMessage,
    handleSystemMessageDisplayMessage
};