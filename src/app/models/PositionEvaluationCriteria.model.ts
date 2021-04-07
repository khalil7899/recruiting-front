import { EvaluationCriteria } from "./EvaluationCriteria.model";
import {Position} from "./Position.model"
export class PositionEvaluationCriteria {
  positionEvaluationCriteriaId: number;

  evaluationCriteria: EvaluationCriteria;

  position: Position;

  note: number;

  constructor(evaluationCriteria: EvaluationCriteria,
    note: number) {
        this.evaluationCriteria = evaluationCriteria;
        this.note = note;
    }
}
