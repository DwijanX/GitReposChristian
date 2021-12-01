#pragma once
#include "Node.h"
/*
1. Insertar al principio
2. Insertar al Final
3. Eliminar al principio
4. Eliminar al Final
5. Buscar Secuencialmente REC
6. Buscar Secuencialmente No REC
7. Mostrar Lista
8. Encontrar el menor de la lista
9. Buscar el elemento que ocupa la iésima posición de la Lista
*/
template <class T>
class Lista8
{
private:
	Node<T>* First;
	Node<T>* Last;
	int SearchRecAlg(Node<T>* LocalFirst, T* Data,int pos);
	int NodesCounter;
public:
	Lista8();
	~Lista8();
	void AddFront(T Data);
	void AddBack(T Data);
	void DeleteFront();
	void DeleteBack();
	void DeleteXValue(T x);
	int SearchNoRec(T* Data);
	int SearchRec(T* Data);
	void Show(void (*Func)(T*));
	T GetTheLowestValue();
	T* operator[](int index);
	int GetNumOfNodes();
	void copy(Lista8<T>* Lista);

};

template <class T>
Lista8<T>::Lista8()
{
	this->First = NULL;
	this->Last = NULL;
	NodesCounter=0;
}
template <class T>
Lista8<T>::~Lista8()
{
	Node<T>* Aux;
	while (First != NULL)
	{
		Aux = First->GetNext();
		delete First;
		First = Aux;
	}
}
template <class T>
void Lista8<T>::AddFront(T Data)
{
	if (First==NULL)
	{
		First = new Node<T>(NULL,NULL, Data);
		Last = First;
	}
	else
	{
		Node<T>* Aux = First;
		First = new Node<T>(Aux, NULL, Data);
		Aux->SetPrev(First);
	}
	NodesCounter+=1;
}
template <class T>
void Lista8<T>::AddBack(T Data)
{
	if (Last== NULL)
	{
		Last = new Node<T>(NULL, NULL, Data);
		First = Last;
	}
	else
	{
		Node<T>* Aux=Last;
		Last = new Node<T>(NULL, Aux, Data);
		Aux->SetNext(Last);
	}
	NodesCounter+=1;
}
template <class T>
void Lista8<T>::DeleteFront()
{
	if (First != NULL)
	{
		if (First == Last)
		{
			delete First;
			First = NULL;
			Last = NULL;
		}
		else
		{
			Node<T>* Aux = First->GetNext();
			delete First;
			First = Aux;
			Aux->SetPrev(NULL);
		}
		NodesCounter-=1;
	}
}
template <class T>
void Lista8<T>::DeleteBack()
{
	if (First != NULL)
	{
		if (First == Last)
		{
			delete First;
			First = NULL;
			Last = NULL;
		}
		else
		{
			Node<T>* Aux = Last->GetPrev();
			delete Last;
			Last = Aux;
			Aux->SetNext(NULL);
		}
		NodesCounter-=1;
	}
}
template <class T>
void Lista8<T>::DeleteXValue(T x)
{
	if (First != NULL)
	{
		bool deleted=false;
		Node<T>* Aux = First;
		do
		{
			if (*Aux->GetData() == x)
			{
				if(Aux==First)
				{
					DeleteFront();
				}
				else if(Aux==Last)
				{
					DeleteBack();
				}
				else
				{
					Aux->GetPrev()->SetNext(Aux->GetNext());
					Aux->GetNext()->SetPrev(Aux->GetPrev());
					delete Aux;
				}
				NodesCounter-=1;
				deleted=true;
			}
			else
			{
				Aux = Aux->GetNext();
			}
		} while (Aux != NULL && deleted==false);
	}
}

template <class T>
int Lista8<T>::SearchNoRec(T* Data)
{
	if (First != NULL)
	{
		Node<T>* Aux = First;
		int Pos = 0;
		do
		{
			if (Aux->GetData() == *Data)
			{
				return Pos;
			}
			Aux = Aux->GetNext();
			Pos++;
		} while (Aux != NULL);
	}
	return -1;
}
template <class T>
int Lista8<T>::SearchRecAlg(Node<T>* LocalFirst, T* Data,int pos)
{
	if (LocalFirst->GetData() == *Data)
		return pos;
	else
	{
		if (LocalFirst->GetNext() == NULL)
			return -1;
		else
			return SearchRecAlg(LocalFirst->GetNext(), Data, pos + 1);
	}
}

template <class T>
int Lista8<T>::SearchRec(T* Data)
{
	if (First == NULL)
		return -1;
	else
		return SearchRecAlg(First, Data, 0);

}
template <class T>
void Lista8<T>::Show(void (*Func)(T*))
{
	if (First != NULL)
	{
		T AuxCont;
		Node<T>* Aux = First;
		do
		{
			Func(Aux->GetData());
			Aux = Aux->GetNext();
		} while (Aux != NULL);
	}
}
template <class T>
T Lista8<T>::GetTheLowestValue()
{
	if (First != NULL)
	{
		T AuxT = *First->GetData();
		Node<T>* Aux = First->GetNext();
		while (Aux != NULL)
		{
			if (AuxT > *Aux->GetData())
				AuxT = *Aux->GetData();
			Aux = Aux->GetNext();
		}
		return AuxT;
	}
	else
		return NULL;
}
template <class T>
T* Lista8<T>::operator[](int index)
{
	if (First != NULL)
	{
		int i;
		bool Overflow = false;
		Node<T>* Aux = First;
		for (i = 0; i < index; i++)
		{
			Aux = Aux->GetNext();
			if (Aux == NULL)
			{
				Overflow = true;
				break;
			}
		}
		if (Overflow)
			return NULL;
		else
		{
			return Aux->GetData();
		}
	}
	else
		return NULL;
}
template <class T>
int Lista8<T>::GetNumOfNodes()
{
	return NodesCounter;
}
template <class T>
void Lista8<T>::copy(Lista8<T>* Lista)
{
	Node<T>* aux=Lista->First;
	while(aux!=NULL)
	{
		this->AddBack(*aux->GetData());
		aux=aux->GetNext();
	}
}
