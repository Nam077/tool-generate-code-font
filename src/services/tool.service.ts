type Character = 'A' | 'E' | 'I' | 'O' | 'U' | 'Y' | 'i' | 'Ư,Ơ' | 'D,d';
type MakeHorn = 'Cả Hai' | 'Chữ Hoa' | 'Chữ Thường' | 'Không Tạo';
type CreateDotlessi = 'Tạo' | 'Không tạo';

export interface Option {
    character: Character;
    grave: string;
    graveComb: string;
    acute: string;
    acuteComb: string;
    tilde: string;
    tildeComb: string;
    dotbelow: string;
    dotbelowComb: string;
    hoi: string;
    hoiComb: string;
    breve: string;
    breveComb: string;
    horn: string;
    hornComb: string;
    dotlessi: string;
    hyphen: string;
    hyphenComb: string;
    features: string;
    makeHorn: MakeHorn;
    createDotlessi: CreateDotlessi;
    circumflex: string;
    circumflexComb: string;
}

interface CharSets {
    arrA: Set<string>;
    arrE: Set<string>;
    arrI: Set<string>;
    arrO: Set<string>;
    arrU: Set<string>;
    arrY: Set<string>;
    arrDcroat: Set<string>;
    arrD: Set<string>;
    arrOhorn: Set<string>;
    arrUhorn: Set<string>;
    arrALow: Set<string>;
    arrELow: Set<string>;
    arrILow: Set<string>;
    arrOLow: Set<string>;
    arrULow: Set<string>;
    arrYLow: Set<string>;
    arrDLow: Set<string>;
    arrDcroatLow: Set<string>;
    arrOhornLow: Set<string>;
    arrUhornLow: Set<string>;
    arrDotlessi: Set<string>;
}

const initialCharSets: CharSets = {
    arrA: new Set(['A']),
    arrE: new Set(['E']),
    arrI: new Set(['I']),
    arrO: new Set(['O']),
    arrU: new Set(['U']),
    arrY: new Set(['Y']),
    arrDcroat: new Set(['Dcroat']),
    arrD: new Set(['D']),
    arrOhorn: new Set(['Ohorn']),
    arrUhorn: new Set(['Uhorn']),
    arrALow: new Set(['a']),
    arrELow: new Set(['e']),
    arrILow: new Set(['i']),
    arrOLow: new Set(['o']),
    arrULow: new Set(['u']),
    arrYLow: new Set(['y']),
    arrDLow: new Set(['d']),
    arrDcroatLow: new Set(['dcroat']),
    arrOhornLow: new Set(['ohorn']),
    arrUhornLow: new Set(['uhorn']),
    arrDotlessi: new Set(['dotlessi']),
};

export class ToolService {
    private option: Option;
    private arrayCharacter: string[];
    private charSets: CharSets = initialCharSets;
    private result: string = '';

    constructor(option: Option, string: string) {
        this.option = option;
        this.arrayCharacter = this.prepareStringForProcessing(string);
    }

    public prepareStringForProcessing(string: string): string[] {
        string = string
            .replace(/\s/g, '')
            .replace(/^\/|\/$/g, '')
            .replace(/\/+/g, '/');
        return string.split('/').filter((item) => item !== '');
    }

    public groupCharacters = (): { message: string; error: boolean } => {
        console.log(this.arrayCharacter.length);

        if (this.arrayCharacter.length < 1) {
            return {
                message: 'Vui lòng nhập ký tự!',
                error: true,
            };
        }
        this.arrayCharacter.forEach((item) => {
            switch (item.charAt(0)) {
                case 'A':
                    this.charSets.arrA.add(item);
                    break;
                case 'E':
                    this.charSets.arrE.add(item);
                    break;
                case 'I':
                    this.charSets.arrI.add(item);
                    break;
                case 'O':
                    this.charSets.arrO.add(item);
                    break;
                case 'U':
                    this.charSets.arrU.add(item);
                    break;
                case 'Y':
                    this.charSets.arrY.add(item);
                    break;
                case 'D':
                    this.charSets.arrD.add(item);
                    break;
                case 'd':
                    this.charSets.arrDLow.add(item);
                    break;
                case 'a':
                    this.charSets.arrALow.add(item);
                    break;
                case 'e':
                    this.charSets.arrELow.add(item);
                    break;
                case 'i':
                    this.charSets.arrILow.add(item);
                    break;
                case 'o':
                    this.charSets.arrOLow.add(item);
                    break;
                case 'u':
                    this.charSets.arrULow.add(item);
                    break;
                case 'y':
                    this.charSets.arrYLow.add(item);
                    break;
                case 'Dcroat':
                    this.charSets.arrDcroat.add(item);
                    break;
                case 'dcroat':
                    this.charSets.arrDcroatLow.add(item);
                    break;
                case 'Ohorn':
                    this.charSets.arrOhorn.add(item);
                    break;
                case 'ohorn':
                    this.charSets.arrOhornLow.add(item);
                    break;
                case 'Uhorn':
                    this.charSets.arrUhorn.add(item);
                    break;
                case 'uhorn':
                    this.charSets.arrUhornLow.add(item);
                    break;
                case 'dotlessi':
                    this.charSets.arrDotlessi.add(item);
                    break;
            }
        });
        return {
            message: 'Gộp nhóm thành công!',
            error: false,
        };
    };

    public generateDefaultStyle = (character: string, feature: string): string => {
        const base = character.split('.')[0];
        const grave = `${character}+${this.option.grave}=${base}grave.${feature}`;
        const acute = `${character}+${this.option.acute}=${base}acute.${feature}`;
        const tilde = `${character}+${this.option.tilde}=${base}tilde.${feature}`;
        const hoi = `${character}+${this.option.hoi}=${base}hoi.${feature}`;
        const dotbelow = `${character}+${this.option.dotbelow}=${base}dotbelow.${feature}`;
        return `${grave}\r\n${acute}\r\n${tilde}\r\n${hoi}\r\n${dotbelow}`;
    };
    public generateCircumflexStyles = (character: string, feature: string): string => {
        let base = character.split('.')[0];
        const circumflexGlyph = this.option.circumflex;
        let circumflex = `${character}+${circumflexGlyph}=${base}circumflex.${feature}`;
        let circumflexGrave = `${character}+${circumflexGlyph}+${this.option.graveComb}=${base}circumflexgrave.${feature}`;
        let circumflexAcute = `${character}+${circumflexGlyph}+${this.option.acuteComb}=${base}circumflexacute.${feature}`;
        let circumflexTilde = `${character}+${circumflexGlyph}+${this.option.tildeComb}=${base}circumflextilde.${feature}`;
        let circumflexHoi = `${character}+${circumflexGlyph}+${this.option.hoiComb}=${base}circumflexhoi.${feature}`;
        let circumflexDotBelow = `${character}+${circumflexGlyph}+${this.option.dotbelow}=${base}circumflexdotbelow.${feature}`;
        return `${circumflex}\r\n${circumflexGrave}\r\n${circumflexAcute}\r\n${circumflexTilde}\r\n${circumflexHoi}\r\n${circumflexDotBelow}`;
    };
    public generateBreveStyle = (character: string, feature: string): string => {
        let base = character.split('.')[0];
        const breveGlyph = this.option.breve;
        let breve = `${character}+${breveGlyph}=${base}breve.${feature}`;
        let breveGrave = `${character}+${breveGlyph}+${this.option.graveComb}=${base}brevegrave.${feature}`;
        let breveAcute = `${character}+${breveGlyph}+${this.option.acuteComb}=${base}breveacute.${feature}`;
        let breveTilde = `${character}+${breveGlyph}+${this.option.tildeComb}=${base}brevetilde.${feature}`;
        let breveHoi = `${character}+${breveGlyph}+${this.option.hoiComb}=${base}brevehoi.${feature}`;
        let breveDotBelow = `${character}+${breveGlyph}+${this.option.dotbelow}=${base}brevedotbelow.${feature}`;
        return `${breve}\r\n${breveGrave}\r\n${breveAcute}\r\n${breveTilde}\r\n${breveHoi}\r\n${breveDotBelow}`;
    };
    public generateHornStyle = (character: string, feature: string): string => {
        let base = character.split('.')[0];
        const hornGlyph = base === 'O' || base === 'U' ? this.option.horn : this.option.hornComb;
        const horn = `${character}+${hornGlyph}=${base}horn.${feature}`;
        const hornGrave = `${character}+${hornGlyph}+${this.option.grave}=${base}horngrave.${feature}`;
        const hornAcute = `${character}+${hornGlyph}+${this.option.acute}=${base}hornacute.${feature}`;
        const hornTilde = `${character}+${hornGlyph}+${this.option.tilde}=${base}horntilde.${feature}`;
        const hornHoi = `${character}+${hornGlyph}+${this.option.hoi}=${base}hornhoi.${feature}`;
        const hornDotbelow = `${character}+${hornGlyph}+${this.option.dotbelow}=${base}horndotbelow.${feature}`;
        return `${horn}\r\n${hornGrave}\r\n${hornAcute}\r\n${hornTilde}\r\n${hornHoi}\r\n${hornDotbelow}`;
    };
    public generateHorn = (character: string, feature: string, makeWithHorn?: boolean): string => {
        let base = character.split('.')[0];
        const hornGlyph = base === 'O' || base === 'U' ? this.option.horn : this.option.hornComb;
        return makeWithHorn
            ? character + '+' + hornGlyph + '=' + base + 'horn' + '.' + feature
            : character + '=' + base + 'horn' + '.' + feature;
    };

    public generateIStyle = (character: string, feature: string, type?: string): string => {
        const base = character.split('.')[0];
        const dotlessi = type ? this.option.dotlessi : 'dotlessi' + feature;
        const dotlessiGrave = `${dotlessi}+${this.option.graveComb}=${base}grave.${feature}`;
        const dotlessiAcute = `${dotlessi}+${this.option.acuteComb}=${base}acute.${feature}`;
        const dotlessiTilde = `${dotlessi}+${this.option.tildeComb}=${base}tilde.${feature}`;
        const dotlessiHoi = `${dotlessi}+${this.option.hoiComb}=${base}hoi.${feature}`;
        const dotlessiDotbelow = `${character}+${this.option.dotbelowComb}=${base}dotbelow.${feature}`;
        return dotlessiGrave + '\r\n' + dotlessiAcute + '\r\n' + dotlessiTilde + '\r\n' + dotlessiHoi + '\r\n' + dotlessiDotbelow;
    };
    public generateDotlessi = (character: string, feature: string): string => {
        const base = character.split('.')[0];
        return `${base} = dotlessi.${feature}`;
    };
    public generateDcroatStyle = (character: string, feature: string): string => {
        let base = character.split('.')[0];
        const hyphen = base === 'D' ? this.option.hyphen : this.option.hyphenComb;
        return `${base}+${hyphen}=${base}croat.${feature}`;
    };

    public generateAStyle = (character: string, feature: string): string => {
        return (
            this.generateDefaultStyle(character, feature) +
            '\r\n' +
            this.generateCircumflexStyles(character, feature) +
            '\r\n' +
            this.generateBreveStyle(character, feature)
        );
    };
    public generateEStyle = (character: string, feature: string): string => {
        return this.generateDefaultStyle(character, feature) + '\r\n' + this.generateCircumflexStyles(character, feature);
    };
    public generateOAndUStyle = (character: string, feature: string, isCap: boolean, isO: boolean): string => {
        let result =
            this.generateDefaultStyle(character, feature) + (isO ? '\r\n' + this.generateCircumflexStyles(character, feature) : '');
        if (isCap == true && (this.option.makeHorn === 'Chữ Hoa' || this.option.makeHorn === 'Cả Hai')) {
            result += '\r\n' + this.generateHornStyle(character, feature);
        }
        if (isCap == false && (this.option.makeHorn === 'Chữ Thường' || this.option.makeHorn === 'Cả Hai')) {
            result += '\r\n' + this.generateHornStyle(character, feature);
        }
        return result;
    };

    public generateCode = (): { data?: string; message: string; error: boolean } => {
        const message = this.groupCharacters();
        if (message.error == true) return message;
        if (this.charSets.arrD.size > 1) {
            this.charSets.arrD.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateDcroatStyle(item, character[1]) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrDLow.size > 1) {
            this.charSets.arrDLow.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateDcroatStyle(item, character[1]) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrA.size > 1) {
            this.charSets.arrA.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateAStyle(item, character[1]) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrE.size > 1) {
            this.charSets.arrE.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateEStyle(item, character[1]) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrI.size > 1) {
            this.charSets.arrI.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateDefaultStyle(item, character[1]) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrO.size > 1) {
            this.charSets.arrO.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateOAndUStyle(item, character[1], true, true) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrOhorn.size > 1) {
            this.charSets.arrOhorn.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateDefaultStyle(item, character[1]) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrU.size > 1) {
            this.charSets.arrU.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateOAndUStyle(item, character[1], true, false) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrUhorn.size > 1) {
            this.charSets.arrUhorn.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateDefaultStyle(item, character[1]) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrY.size > 1) {
            this.charSets.arrY.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateDefaultStyle(item, character[1]) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrALow.size > 1) {
            this.charSets.arrALow.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateAStyle(item, character[1]) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrELow.size > 1) {
            this.charSets.arrELow.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateEStyle(item, character[1]) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrILow.size > 1) {
            this.charSets.arrILow.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateIStyle(item, character[1]) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrOLow.size > 1) {
            this.charSets.arrOLow.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateOAndUStyle(item, character[1], true, true) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrOhornLow.size > 1) {
            this.charSets.arrOhornLow.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateDefaultStyle(item, character[1]) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrULow.size > 1) {
            this.charSets.arrULow.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateOAndUStyle(item, character[1], false, false) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrUhornLow.size > 1) {
            this.charSets.arrUhornLow.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateDefaultStyle(item, character[1]) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrYLow.size > 1) {
            this.charSets.arrYLow.forEach((item) => {
                const character = item.split('.');
                if (character.length > 1) {
                    this.result += this.generateDefaultStyle(item, character[1]) + '\r\n\r\n';
                }
            });
        }
        return {
            message: 'Tạo thành công',
            error: false,
            data: this.result,
        };
    };

    public filterGlyph = (): { data?: string; message: string; error: boolean } => {
        const message = this.groupCharacters();
        if (message.error == true) return message;
        if (this.charSets.arrD.size > 1) {
            this.charSets.arrD.forEach((itemD) => {
                this.result += itemD + '/';
                this.charSets.arrDcroat.forEach((itemDcroat) => {
                    itemD.split('.')[1] === itemDcroat.split('.')[1] ? (this.result += itemDcroat + '/') : '';
                });
            });
            this.result += '\r\n';
        }
        if (this.charSets.arrDcroat.size > 1) {
            this.result += [...this.charSets.arrDcroat].join('/') + '\r\n';
        }
        if (this.charSets.arrDLow.size > 1) {
            this.charSets.arrDLow.forEach((itemD) => {
                this.result += itemD + '/';
                this.charSets.arrDcroatLow.forEach((itemDcroat) => {
                    itemD.split('.')[1] === itemDcroat.split('.')[1] ? (this.result += itemDcroat + '/') : '';
                });
            });
            this.result += '\r\n';
        }
        if (this.charSets.arrA.size > 1) {
            this.result += [...this.charSets.arrA].join('/') + '\r\n';
        }
        if (this.charSets.arrE.size > 1) {
            this.result += [...this.charSets.arrE].join('/') + '\r\n';
        }
        if (this.charSets.arrI.size > 1) {
            this.result += [...this.charSets.arrI].join('/') + '\r\n';
        }
        if (this.charSets.arrO.size > 1) {
            this.charSets.arrO.forEach((itemO) => {
                this.result += itemO + '/';
                this.charSets.arrDotlessi.forEach((itemOhorn) => {
                    itemO.split('.')[1] === itemOhorn.split('.')[1] ? (this.result += itemOhorn + '/') : '';
                });
            });
            this.result += '\r\n';
        }
        if (this.charSets.arrOhorn.size > 1) {
            this.result += [...this.charSets.arrOhorn].join('/') + '\r\n';
        }
        if (this.charSets.arrU.size > 1) {
            this.charSets.arrU.forEach((itemU) => {
                this.result += itemU + '/';
                this.charSets.arrUhorn.forEach((itemUhorn) => {
                    itemU.split('.')[1] === itemUhorn.split('.')[1] ? (this.result += itemUhorn + '/') : '';
                });
            });
            this.result += '\r\n';
        }
        if (this.charSets.arrUhorn.size > 1) {
            this.result += [...this.charSets.arrUhorn].join('/') + '\r\n';
        }
        if (this.charSets.arrY.size > 1) {
            this.result += [...this.charSets.arrY].join('/') + '\r\n';
        }
        if (this.charSets.arrALow.size > 1) {
            this.result += [...this.charSets.arrALow].join('/') + '\r\n';
        }
        if (this.charSets.arrELow.size > 1) {
            this.result += [...this.charSets.arrELow].join('/') + '\r\n';
        }
        if (this.charSets.arrILow.size > 1) {
            this.charSets.arrILow.forEach((itemI) => {
                this.result += itemI + '/';
                this.charSets.arrDotlessi.forEach((itemILow) => {
                    itemI.split('.')[1] === itemILow.split('.')[1] ? (this.result += itemILow + '/') : '';
                });
            });
            this.result += '\r\n';
        }
        if (this.charSets.arrDotlessi.size > 1) {
            this.result += [...this.charSets.arrDotlessi].join('/') + '\r\n';
        }
        if (this.charSets.arrOLow.size > 1) {
            this.charSets.arrOLow.forEach((itemO) => {
                this.result += itemO + '/';
                this.charSets.arrOhornLow.forEach((itemOhorn) => {
                    itemO.split('.')[1] === itemOhorn.split('.')[1] ? (this.result += itemOhorn + '/') : '';
                });
            });
            this.result += '\r\n';
        }
        if (this.charSets.arrOhornLow.size > 1) {
            this.result += [...this.charSets.arrOhornLow].join('/') + '\r\n';
        }
        if (this.charSets.arrULow.size > 1) {
            this.charSets.arrULow.forEach((itemU) => {
                this.result += itemU + '/';
                this.charSets.arrUhornLow.forEach((itemUhorn) => {
                    itemU.split('.')[1] === itemUhorn.split('.')[1] ? (this.result += itemUhorn + '/') : '';
                });
            });
            this.result += '\r\n';
        }
        if (this.charSets.arrUhornLow.size > 1) {
            this.result += [...this.charSets.arrUhornLow].join('/') + '\r\n';
        }
        if (this.charSets.arrYLow.size > 1) {
            this.result += [...this.charSets.arrYLow].join('/') + '\r\n';
        }
        return {
            message: 'Tạo thành công',
            error: false,
            data: this.result,
        };
    };
    public generateHornMultiple = (makeWithHorn: boolean): { data?: string; message: string; error: boolean } => {
        const message = this.groupCharacters();
        if (message.error == true) return message;
        if (this.charSets.arrO.size > 1) {
            this.charSets.arrO.forEach((item) => {
                const splitItem = item.split('.');
                if (splitItem.length > 1) {
                    this.result += this.generateHorn(item, splitItem[1], makeWithHorn) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrOLow.size > 1) {
            this.charSets.arrOLow.forEach((item) => {
                const splitItem = item.split('.');
                if (splitItem.length > 1) {
                    this.result += this.generateHorn(item, splitItem[1], makeWithHorn) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrU.size > 1) {
            this.charSets.arrU.forEach((item) => {
                const splitItem = item.split('.');
                if (splitItem.length > 1) {
                    this.result += this.generateHorn(item, splitItem[1], makeWithHorn) + '\r\n\r\n';
                }
            });
        }
        if (this.charSets.arrULow.size > 1) {
            this.charSets.arrULow.forEach((item) => {
                const splitItem = item.split('.');
                if (splitItem.length > 1) {
                    this.result += this.generateHorn(item, splitItem[1], makeWithHorn) + '\r\n\r\n';
                }
            });
        }
        return {
            message: 'Tạo thành công!',
            error: false,
            data: this.result,
        };
    };
    public generateDotlessiMultiple = (): { data?: string; message: string; error: boolean } => {
        const message = this.groupCharacters();
        if (message.error == true) return message;
        if (this.charSets.arrILow.size > 1) {
            console.log('ok');

            this.charSets.arrILow.forEach((item) => {
                const splitItem = item.split('.');
                if (splitItem.length > 1) {
                    this.result += this.generateDotlessi(item, splitItem[1]) + '\r\n\r\n';
                }
            });
        }
        return {
            message: 'Tạo thành công!',
            error: false,
            data: this.result,
        };
    };
}
