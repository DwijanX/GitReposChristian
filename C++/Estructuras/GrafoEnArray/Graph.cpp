#include "Graph.h"
Graph::Graph(int ArrayLen)
{
    this->Size=ArrayLen;
    Array=new NodeGraph [ArrayLen];
}
Graph::~Graph()
{
    delete [] Array;
}
void Graph::AddEdge(int OgNode,int DestNode)
{
    Array[OgNode].getLista().AddBack(DestNode);
}
void Graph::LoadFromFile(string FileDirection)
{
    int OgNodeAux,DestNodeAux;
    ifstream File;
    File.open(FileDirection);
    while(File>>OgNodeAux && File>>DestNodeAux)
    {
        AddEdge(OgNodeAux,DestNodeAux);
    }
    File.close();
}
bool Graph::AmplitudeSearch(int Origin,int Destiny)
{
    int I,Vertex;
    int* Adjacent;
    bool Found=false;
    Array[Origin].setMarked(true);
    queue<int> Queue;
    Queue.push(Origin);
    while(Queue.empty()==false && Found==false)
    {
        I=0;
        Vertex=Queue.front();
        Queue.pop();
        Adjacent=Array[Origin].getLista()[I];
        while(Adjacent!=NULL && Found==false)
        {
            if(Array[*Adjacent].getMarked()==false)
            {
                Array[*Adjacent].setFather(Vertex);
                if(*Adjacent==Destiny)
                {
                    Found=true;
                }
                else
                {
                    Array[*Adjacent].setMarked(true);
                    Queue.push(*Adjacent);
                }
            }
            I++;
            Adjacent=Array[Vertex].getLista()[I];
        }
    }
    return Found;

}
void Graph::SetNodesToInitialState()
{
    for(int i=0;i<Size;i++)
    {
        Array[i].setNodeGraphToInitialState();
    }
}

vector<int> Graph::GetSavedPath(int Destiny)
{
    vector<int> ans;
    int pos=Destiny;
    int aux;
    if(Array[Destiny].getFather()!=-1)
    {
        ans.insert(ans.begin(),Destiny);
    }
    while(Array[pos].getFather()!=-1)
    {
        aux=Array[pos].getFather();
        ans.insert(ans.begin(),aux);
        pos=aux;
    }
    SetNodesToInitialState();
    return ans;
}
void Graph::DeepSearchAlg(int Origin,int Destiny,bool* Found)
{
    *Found=false;
    Array[Origin].setMarked(true);
    int I=0;
    int* Adjacent=Array[Origin].getLista()[I];
    while (Adjacent!=NULL)
    {
        if(*Found==false && Array[*Adjacent].getMarked()==false)
        {
            Array[*Adjacent].setFather(Origin);
            if(*Adjacent==Destiny)
            {
                *Found=true;
            }
            else
            {
                DeepSearchAlg(*Adjacent,Destiny,Found);
            }
        }
        I++;
        Adjacent=Array[Origin].getLista()[I];
    }
}
bool Graph::DeepSearch(int Origin,int Destiny)
{
    bool Found=false;
    DeepSearchAlg(Origin,Destiny,&Found);
    return Found;
}
void Graph::ShowGraph(void (funcToShowInt)(int*))
{
    for(int i=0;i<Size;i++)
    {
        cout<<"Adyacencias de "<<i<<": ";
        Array[i].getLista().Show(funcToShowInt);
        cout<<"\n";
    }
}
