<script lang="ts">
	import { buttonVariants } from '$lib/shadcn/componentes/ui/button/index.js';
	import * as Drawer from '$lib/shadcn/componentes/ui/drawer/index.js';
	import type { Snippet } from 'svelte';

	let { children, titulo, descricao }: { children: Snippet; titulo: string; descricao: string } =
		$props();
</script>

<Drawer.Root direction="top">
	<Drawer.Trigger>
		<div
			class={buttonVariants({
				variant: 'default',
				class: 'cursor-pointer',
			})}
		>
			{titulo}...
		</div>
	</Drawer.Trigger>

	<Drawer.Content
		class="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[99vh]"
	>
		<Drawer.Header>
			<Drawer.Title>{titulo}</Drawer.Title>

			<Drawer.Description>{descricao}</Drawer.Description>
		</Drawer.Header>

		<div class="no-scrollbar overflow-y-auto px-4">
			<p class="mb-4 leading-normal">
				{@render children()}
			</p>
		</div>

		<Drawer.Footer>
			<Drawer.Close class={buttonVariants({ variant: 'default', class: 'cursor-pointer' })}>
				FECHAR
			</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
