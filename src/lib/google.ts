export async function createFolder(accessToken: string, name: string, parentId?: string) {
    const metadata = {
        name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: parentId ? [parentId] : undefined,
    };

    const res = await fetch('https://www.googleapis.com/drive/v3/files', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
    });

    if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to create folder ${name}: ${errorData}`);
    }
    return await res.json();
}

export async function createSheet(accessToken: string, name: string, parentId: string) {
    const metadata = {
        name,
        mimeType: 'application/vnd.google-apps.spreadsheet',
        parents: [parentId],
    };

    const res = await fetch('https://www.googleapis.com/drive/v3/files', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
    });

    if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to create sheet ${name}: ${errorData}`);
    }
    return await res.json();
}
