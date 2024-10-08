import { Request, Response } from "express";
import { IPost, IPostResponse, emptyPost } from "../../domain/models/post";
import { PostUseCase } from "../../domain/usecases/post.usecase";
import { PostRepository } from "../../data/repositories/impl/post.repository";
import { PostMapper } from "../mappers/mapper";
import { PostRequestDto } from "../dtos/post-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import { User } from "../../data/entities/user";
import { deleteFile } from "../../utils/util";

const postRepository = new PostRepository();
const postUseCase = new PostUseCase(postRepository);
const postMapper = new PostMapper();

export class PostsController {
  async createPost(req: Request, res: Response<IPostResponse>): Promise<void> {
    const dto = new PostRequestDto(req.body);
    const validationErrors = await validate(dto);
    const user = req.user as User;
    const tags = req.body.tags;

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const postResponse = await postUseCase.createPost({
          ...dto.toData(),
          authorId: user.id,
          imageUrl: req.body.imageUrl,
          tags,
        });

        res.status(201).json({
          data: postResponse.toJSON<IPost>(),
          message: "Post created Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [],
          success: false,
        });
      }
    }
  }

  async getAll(req: Request, res: Response<any>): Promise<void> {
    try {
      const posts = await postUseCase.getAll();
      const postsDTO = postMapper.toDTOs(posts);

      res.json(postsDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getPostById(req: Request, res: Response<any>): Promise<void> {
    try {
      const id = req.params.id;

      const post = await postUseCase.getPostById(id);
      if (!post) {
        throw new NotFoundException("Post", id);
      }
      const postDTO = postMapper.toDTO(post);
      res.json(postDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  
  async getPostBySlug(req: Request, res: Response<any>): Promise<void> {
    try {
      const slug = req.params.slug;

      const post = await postUseCase.getPostBySlug(slug);
      if (!post) {
        throw new NotFoundException("Post", slug);
      }
      const postDTO = postMapper.toDTO(post);
      res.json(postDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }


  async updatePost(req: Request, res: Response<IPostResponse>): Promise<void> {
    const dto = new PostRequestDto(req.body);
    const validationErrors = await validate(dto);
    const user = req.user as User;

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const id = req.params.id;

        const obj: IPost = {
          ...emptyPost,
          ...req.body,
          id: id,
          imageUrl: req.body.imageUrl,
          authorId: user.id,
        };
        const updatedPost = await postUseCase.updatePost(obj);
        const postDto = postMapper.toDTO(updatedPost);

        res.json({
          data: postDto,
          success: true,
          message: "Post Updated Successfully!",
          validationErrors: [],
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async deletePost(req: Request, res: Response<IPostResponse>): Promise<void> {
    try {
      const id = req.params.id;

      const post = await postUseCase.getPostById(id);

      if (post) {
        deleteFile(post.dataValues.imageUrl, "posts");
      }
      await postUseCase.deletePost(id);

      res.status(204).json({
        message: `Operation successfully completed!`,
        validationErrors: [],
        success: true,
        data: null,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        data: null,
        validationErrors: [error],
        success: true,
      });
    }
  }
}
