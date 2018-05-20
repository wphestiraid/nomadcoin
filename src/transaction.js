const CryptoJS = require('crypto-js');
const Elliptic = require('elliptic');

const ec = new Elliptic('secp256k1');

class TxOut {
  constructor(address, amount) {
    this.address = address;
    this.amount = amount;
  }
}

class TxIn {
  // Unspent TxOutId
  // Unspent TxOutIndex
  // Signature
}

class Transaction {
  // ID
  // txIns[]
  // txOuts[]
}

class UTxOut {
  constructor(txOutId, txOutIndex, address, amount) {
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.address = address;
    this.amount = amount;
  }
}

let uTxOuts = [];

const getTxId = tx => {
  const txInsContent = tx.txIns
    .map(txIn => (txIn.uTxOutId = txIn.txOutIndex))
    .reduce((a, b) => a + b, '');
  const txOutContent = tx.txOuts
    .map(txOut => txOut.address + txOut.amount)
    .reduce((a, b) => a + b, '');
  return CryptoJS.SHA256(txInContent, txOutContent).toString();
};

const findUTxOut = (txOutId, txOutIndex, uTxOutList) => {
  return uTxOutList.find(
    uTxOut => uTxOut.txOutId === txOutId && uTxOut.txOutIndex === txOutIndex
  );
};

const signTxIn = (tx, txInIndex, privateKey, uTxOut) => {
  const txIn = tx.txIns[txInIndex];
  const dataToSign = tx.id;
  const referencedUTxOut = findUTxOut(txIn.txOutId, txIn.txOutIndex, uTxOuts);
  if (referencedUTxOut === null) {
    return;
  }
  // TODO: Sign the txIn
};
