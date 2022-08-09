import {
  Extensible,
  PluginConfig,
  Plugin,
  HandleRequest,
  InvalidParentError,
  JovoError,
} from '@jovotech/framework';

import { JovoPlayerGenerator } from './JovoPlayerGenerator';
import list1 from './data/displayNameList1.json'
import list2 from './data/displayNameList2.json'

export interface ProfileInfo {
  displayName: string;
  avatarUrl: string;
  color: string;
}

export interface PlayerGeneratorPluginConfig extends PluginConfig {
  displayName: {
    list1: string[];
    list2: string[];
    suffixDigits: number;
    maxLength: number;
    fallbackName: string;
  };
  avatar: {
    count: number;
    urlPattern: string;
  };
}

export class PlayerGenerator extends Plugin<PlayerGeneratorPluginConfig> {
  mount(parent: Extensible): Promise<void> | void {
    if (!(parent instanceof HandleRequest)) {
      throw new InvalidParentError(this.constructor.name, HandleRequest);
    }

    parent.middlewareCollection.use('before.dialogue.start', async (jovo) => {
      jovo.$playergen = new JovoPlayerGenerator(this.config);

      if (this.config.displayName.suffixDigits < 0 || this.config.displayName.suffixDigits > 5) {
        throw new JovoError({
          message: `The value for displayName.suffixDigits must be between 0-5. Set to 0 to not include suffix.`,
        });
      }

      if (this.config.displayName.maxLength < 5) {
        throw new JovoError({
          message: `The value for displayName.maxLength must be 5 or more.`,
        });
      }

    });
  }

  getDefaultConfig(): PlayerGeneratorPluginConfig {
    return {
      displayName: {
        list1,
        list2,
        suffixDigits: 4,
        maxLength: 25,
        fallbackName: 'unknown',
      },
      avatar: {
        count: 0,
        urlPattern: '',
      },
    };
  }
}
