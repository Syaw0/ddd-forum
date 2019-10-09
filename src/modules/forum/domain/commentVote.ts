
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { CommentId } from "./commentId";
import { MemberId } from "./memberId";
import { Guard } from "../../../shared/core/Guard";
import { VoteType } from "./vote";

interface CommentVoteProps {
  CommentId: CommentId;
  memberId: MemberId;
  type: VoteType;
}

export class CommentVote extends Entity<CommentVoteProps> {

  get id (): UniqueEntityID {
    return this._id;
  }

  get commentId (): CommentId {
    return this.props.CommentId;
  }

  get memberId (): MemberId {
    return this.props.memberId;
  }

  get type (): VoteType {
    return this.props.type;
  }

  public isUpvote (): boolean {
    return this.props.type === 'UPVOTE';
  }

  public isDownvote (): boolean {
    return this.props.type === 'DOWNVOTE';
  }

  private constructor (props: CommentVoteProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: CommentVoteProps, id?: UniqueEntityID): Result<CommentVote> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.memberId, argumentName: 'memberId' },
      { argument: props.CommentId, argumentName: 'commentId' },
      { argument: props.type, argumentName: 'type' }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<CommentVote>(guardResult.message);
    } else {
      return Result.ok<CommentVote>(new CommentVote(props, id));
    }
  }
}