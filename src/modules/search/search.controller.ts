import { Controller, Get, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // GET /api/search?q=mercy&limit=20
  @Get()
  search(
    @Query('q') query: string,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.searchService.search(query, limit);
  }
}
