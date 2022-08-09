import { PlayerGeneratorPluginConfig, ProfileInfo } from './PlayerGenerator';
import sample from 'lodash.sample';

export class JovoPlayerGenerator {
  constructor(readonly config: PlayerGeneratorPluginConfig) {}

  generateProfile(): ProfileInfo {
    return {
      displayName: this.generateDisplayName(),
      avatarUrl: this.generateAvatarUrl(),
      color: this.generateHexColor(),
    };
  }

  generateDisplayName(): string {
    const MAX = 10;

    let name;
    let count = 0;
    let parts: string[];

    do {
      // MAX tries to generate a display name that fits maxLength
      parts = [];
      count++;
      parts.push(sample(this.config.displayName.list1) ?? '');
      parts.push(sample(this.config.displayName.list2) ?? '');
      parts.push(this.generatePaddedNumber());

      name = parts.join(' ').trim();
    } while (count < MAX && name.length > this.config.displayName.maxLength);

    if (count === MAX) {
      // use fallback name
      parts = [];
      parts.push(this.config.displayName.fallbackName);
      parts.push(this.generatePaddedNumber());

      name = parts.join(' ').trim();
    }

    if (name.length > this.config.displayName.maxLength) {
      // force to maxLength
      name = name.slice(0, this.config.displayName.maxLength).trim();
    }

    return name;
  }

  generateAvatarUrl(): string {
    const index = this.getRandomInt(this.config.avatar.count);
    return this.config.avatar.urlPattern.replace('{{index}}', index.toString());
  }

  generateHexColor(): string {
    return '#' + Math.random().toString(16).slice(2, 8);
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private generatePaddedNumber() {
    const digits = this.config.displayName.suffixDigits;

    if (digits === 0) {
        return '';
    }

    const max = Math.pow(10, digits) - 1;
    const value = this.getRandomInt(max);
    const padded = value.toString().padStart(digits, '0');

    return padded;
  }
}
