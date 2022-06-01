<script lang="ts">
  import { callApiWithAuth } from "src/utils/call-api-with-auth.util";
  import { env } from "src/utils/env.util";

  let selectedFile: File;

  const onFileUpload = async (event: Event) => {
    const files = (event.target as HTMLInputElement).files;

    if (!files || !files.length) {
      return;
    }

    selectedFile = files[0];
  };

  const onAddTreeClick = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    await callApiWithAuth(`${env.apiOriginUri}/ImageUpload`, "POST", formData);
  };
</script>

<svelte:head>
  <title>Moje drzewa | Zielone Gliwice</title>
</svelte:head>

<h1>Moje drzewa</h1>
<input type="file" on:change={onFileUpload} />
<button on:click={onAddTreeClick}>Dodaj drzewo</button>
