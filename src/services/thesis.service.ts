import { Result } from '@interfaces/api.interface';
import {
  IThesis,
  IThesisService,
  ThesisCreationDTO,
} from '@interfaces/thesis.interface';
import { ThesisRepository } from '@repositories/thesis.repository';
import { generateResult } from '@utils/generateResult';

export class ThesisService implements IThesisService {
  private thesisRepository;

  constructor() {
    this.thesisRepository = new ThesisRepository();
  }

  public async createThesis(
    Thesis: ThesisCreationDTO
  ): Promise<Result<IThesis>> {
    try {
      if (!Thesis) throw new Error('Los datos del libro son obligatorios');

      const newThesis = await this.thesisRepository.Create(Thesis);

      return generateResult(true, null, newThesis);
    } catch (error) {
      return generateResult(false, `${error}`);
    }
  }

  public async getAllThesiss(): Promise<Result<IThesis[]>> {
    try {
      const Thesiss = await this.thesisRepository.FindAll();
      return generateResult(true, null, Thesiss);
    } catch (error) {
      return generateResult(false, `${error}`);
    }
  }

  public async updateThesisFields(
    Thesis: Omit<IThesis, 'created_at'>
  ): Promise<Result<IThesis>> {
    try {
      if (Thesis.id == null)
        return generateResult(false, 'El ID es obligatorio');

      const data = this.cleanInvalidValues(Thesis);

      const updatedThesis = await this.thesisRepository.Update(Thesis.id, data);

      return generateResult(true, null, updatedThesis);
    } catch (error) {
      return generateResult(false, `${error}`);
    }
  }

  public async deleteThesisbyId(ThesisId: number): Promise<Result<IThesis>> {
    try {
      if (!this.isOnlyNumber(ThesisId))
        return generateResult(false, 'El ID del libro debe ser de tipo INT');

      const deletedThesis = await this.thesisRepository.Delete(ThesisId);

      return generateResult(true, null, deletedThesis);
    } catch (error) {
      return generateResult(false, 'error interno del servidor');
    }
  }

  private cleanInvalidValues(
    obj: ThesisCreationDTO
  ): Partial<ThesisCreationDTO> {
    const newObj: Partial<ThesisCreationDTO> = {};

    for (const [key, value] of Object.entries(obj) as [
      keyof ThesisCreationDTO,
      any
    ][]) {
      if (value != null) {
        newObj[key] = value;
      }
    }

    return newObj;
  }

  private isOnlyNumber(value: number | string | undefined): boolean {
    return typeof value === 'number' && !isNaN(value);
  }
}
