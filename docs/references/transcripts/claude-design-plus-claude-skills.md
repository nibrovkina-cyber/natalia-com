# Claude Design + Claude Skills (full system)

Это **методическое видео** про то как построить полный marketing system из:
1. Brand skills (foundation)
2. Function skills (повседневные задачи)
3. Specialty skills (специфика)
4. Campaign manager agent (orchestrator)
5. Notion skills library (sharing с командой)
6. Auto-sync routine (раз в неделю)

В видео разобран пример «Carely» (healthcare SaaS бренд) — 8 skills + agent.

## Ключевые принципы

- **Group skills into 3 types:** brand → function → specialty
- **Build foundation FIRST** (brand-voice + design-system)
- **Versioning в каждом skill** (`version: x.y.z`) — для library tracking
- **Design system из Claude Design — это и есть skill** (drag-drop в Claude Code project)
- **Templates first для visual skills:** сначала собрать carousel-template / motion-template в Claude Design, потом обернуть в skill который этот template использует
- **Storyboard всегда before motion generation** — не давай агенту сразу генерить video, требуй план кадров
- **Campaign manager spawns subagents** — не загромождает context главного агента
- **Notion library** — индивидуальная система → командная
- **Routine для auto-sync** — раз в неделю проверка новых skills
