#include "pch.h"
#include "ClassWithEventHandler.h"

using namespace WinmdToTypeScript::Native;

ClassWithEventHandler::ClassWithEventHandler(void)
{
}

void ClassWithEventHandler::DoSomething()
{
	//Do something....

	// ...then fire the event:
	SomethingHappened(this, L"Something happened.");
}