await AssistantResponse.create({
    signalId: signalId || null,
    plan: plan || 'unknown',
    gptComment: gptOutput,
    createdAt: new Date()
  });
  