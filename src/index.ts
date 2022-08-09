import { JovoPlayerGenerator } from './JovoPlayerGenerator';

declare module '@jovotech/framework/dist/types/Jovo' {
  interface Jovo {
    $playergen: JovoPlayerGenerator;
  }
}

export * from './JovoPlayerGenerator';
